<script>
    import Quirk from "../Quirk.svelte";
</script>

## Table of Contents

## What?

Building a process that transforms SvelteKit source code into the website you are looking at.

### Requirements

- cheap
- fast
- completely automated
- deterministic
- reliable 🪨

## How?

For deployment of this website we essentially need a tool that can build a static webpage, upload it somewhere and ensure it is accessible to the public as http webserver.

The obvious play to deploy this static website is the Scrooge McDuck Stack (consisting of `S3`, `Cloudfront` and `ACM`), therefore we have to **A)** compile and upload the source code to S3 and **B)** invalidate the cloudfront cache for a deployment, a classic "CI/CD process" you think?

### CodeBuild, CodePipeline & Lambda

An amateur would probably spin up an AWS CodePipeline before you could even spell "CI/CD process". *Me doing exactly this...* 🕳️👨‍🦯

However, one might find out very soon that it's not that simple; while the CodePipeline is suited for various use-cases, building and pushing static S3 data is not one of them.

If you look at this from another perspective that actually makes quite sense because in our situation the process is more like a "CI process with some CD". The only thing we need to actually `deploy` in that sense is upload and invalidate the build output to S3; both of which is not natively supported by CodePipeline...

As always there are many solutions to this problem. The most obvious one that I also rolled out initially is to build a CodeBuild project that uploads its artifacts to the S3 bucket while creating the Cloudfront invalidation by hand.

Unfortunately, this is kinda not "completely automated" and violates the expected "deterministic" behavior, as CodeBuild just blindly uploads build artifacts to S3 without cleaning up previous outputs, effectively leaving a merged mess in the S3 folder.

The unsatisfying truth is that all roads lead to scripting here. In most situations we could now just add this to the post_build hook in the CodeBuild buildspec like this:

```yaml
version: 0.2

phases:
  build:
    commands:
        - npm ci && npm run build
  post_build:
    commands:
        # data is deterministically generated from source repo
        # so even if this is not perfectly resilient we could just roll it 
        # back from the codebuild console by using the old repo version.
        - aws s3 rm "s3://megakuul/web/" --recursive
        - aws s3 cp build "s3://megakuul/web" --recursive
        - aws cloudfront create-invalidation --distribution-id=EGFF3WTJA0H6S --paths="/web/*"
# artifact writer is messy and has no post hook; prefer the cli as shown above...
# artifacts:
#   files:
#     - '**/*'
#   base-directory: build 
#   name: "#{SourceVariables.CommitId}" # for this to work enable semantic versioning
```

However, this requires an image with `npm` AND `aws cli` installed; while the aws al2023 actually provides this, it lacks a recent nodejs version to compile my bleeding edge blog features 🩸

So let's conduct another simple sysadmin solution before we switch to the heavy DoingEverythingWithLamda™ gears:

We can wrap the CodeBuild project in a CodePipeline that just executes TWO CodeBuild stages:

1. Source Stage (read from github repo)
2. Build Stage (execute our Codebuilder with recent nodejs image)
3. Upload Stage (execute via Pipeline S3 upload action)
4. Deploy Stage (execute an al2023 Codebuilder with aws cli)

For this process we just need to slightly update the build stage to look something like this:

```yaml
version: 0.2

phases:
  build:
    commands:
        - npm ci && npm run build

artifacts:
  files:
    - '**/*'
  base-directory: build
```

It's important to understand that Codepipeline effectively hijacks 🏴‍☠️ the artifact upload stage from Codebuild (bzw. the `buildspec.yaml`).
Therefore, attributes like `artifacts.name` become useless and we must use a special **S3 Deploy** stage to decompress and upload our artifacts to a configurable location.

Luckily you can use variables like `#{SourceVariables.CommitId}` in the `Deployment path` of the builtin Amazon S3 action provider.
This allows us to store multiple website versions side-by-side in the bucket without overwriting previous versions. 



Finally the deployment stage executes the following bash script which effectively updates the `OriginPath` pointer of the Cloudfront distribution.
This ensures an atomic update and a clean rollover process that can be rolled back fairly simple (just point OriginPath back to the old VERSION).

```bash
set -e
RESP=$(aws cloudfront get-distribution --id=$DISTRIBUTION)
ETAG=$(echo $RESP | jq -r .ETag)
echo $(echo "$RESP" | jq .Distribution.DistributionConfig | jq '.Origins.Items[0].OriginPath = "/#{SourceVariables.CommitId}"') > config.json
aws cloudfront update-distribution --id=$DISTRIBUTION --if-match=$ETAG --distribution-config=file://./config.json
aws cloudfront create-invalidation --distribution-id=$DISTRIBUTION --path="/*"
```
**ATTENTION**: In the CodePipeline console you can enter `Commands`, however, you cannot specify multiline commands there! (because its just converted to a yaml list of commands)



### Cloudfront, S3 & ACM

Finally I pressed some buttons in the Cloudfront, ACM and S3 console to setup the rest of the stack (not going into detail here; literally every vercel soydev can do this).

The only *hacky fix* we need in this stack is the HTTP routing. While the S3 static website hosting is capable of automatically rewriting `/mypath/`->`/mypath/index.html`, the much cooler approach of using internal Cloudfront OAC with a bucket policy does not do this. Therefore, I added a Cloudfront function to fix the routing quirk:

```js 
async function handler(event) {
  const request = event.request;
  // don't manipulate sveltekit assets
  if (request.uri.startsWith('/_app/') || /\.[^\/.]+$/.test(request.uri)) {
    return request;
  }
  if (request.uri.endsWith('/')) {
    request.uri += 'index.html';
  } else {
    request.uri += '/index.html';
  }
  return request;
}
```

Ah, and before I forget it, please also use a bucket policy that restricts access to the EXACT Cloudfront distribution:
```json
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Effect": "Allow",
			"Principal": {
				"Service": "cloudfront.amazonaws.com"
			},
			"Action": "s3:GetObject",
			"Resource": "arn:aws:s3:::megakuul/*"
		},
		{
			"Effect": "Allow",
			"Principal": {
				"Service": "cloudfront.amazonaws.com"
			},
			"Action": "s3:GetObject",
			"Resource": "arn:aws:s3:::megakuul/*",
			"Condition": {
				"ArnLike": {
					"AWS:SourceArn": "arn:aws:cloudfront::111111111111:distribution/EEEEEEEEEEEEE"
				}
			}
		}
	]
}
```

Not only does this protect your valuable public assets, but it also drastically lowers the heart-attack rate of AWS solution architects reviewing your infrastructure.


### Further information

This article just scratches the surface of Codepipeline variables (by using the auto exported `CommitId` from `SourceVariables` namespace) further information about variable configuration can be found [here](https://docs.aws.amazon.com/codepipeline/latest/userguide/reference-variables.html).


## Quirks

- Cross region artifact buckets and source connections can be selected in the ui but actually don't work... 

<Quirk score={6.3}>
Ensure region compatibility between build project and the connection / buckets (for cross region bucket writes use the aws cli in the buildspec instead of the artifact writer)
</Quirk>

- No deterministic artifact writer in CodeBuild (data is just blindly uploaded 🫣)

<Quirk score={5.5}>
Use image with aws cli, upload artifacts and then use `post_build` or attach Lambda builder with CodePipeline wrapper (don't forget IAM permissions).
</Quirk>

- No post artifact writer stage in CodeBuild 

<Quirk score={1.4}>
Use image with aws cli, upload artifacts and then use `post_build` or attach Lambda builder with CodePipeline wrapper  (don't forget IAM permissions).
</Quirk>

- The appealing "Allow AWS to modify this service role" button often actually doesn't work in CodeBuild and CodePipeline 

<Quirk score={6.9}>
Just keep this in mind and update the role manually as needed.
</Quirk>

- CodePipeline hides most of its features on initialization.

<Quirk score={5.8}>
Edit the pipeline to unleash true power.
</Quirk>

- CodePipeline/CodeBuild `Commands`-block doesn't support multiline commands (even if the ux strongly suggests otherwise).

<Quirk score={8.2}>
Just only use single line commands.
</Quirk>

- Cloudfront does not support routing policies that go beyond behaviors, errors and default root object.

<Quirk score={3.6}>
Write a Cloudfront function that does the appropriate routing.
</Quirk>
