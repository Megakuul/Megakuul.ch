<script>
    import Quirk from "../Quick.svelte";
</script>

## Table of Contents

## What?

Building a process that transforms SvelteKit source code into the website you are looking at.

### Requirements

- cheap
- fast
- completely automated
- deterministic

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
#     - 'build/**/*'
```

However, this requires an image with `npm` AND `aws cli` installed; while the aws al2023 actually provides this, it lacks a recent nodejs version to compile my bleeding edge blog features 🩸

So let's conduct the other overengineered solution: wrapping the CodeBuild project in a CodePipeline that triggers the following Lambda function that performs the deployment for me:

```python
# TODO
```

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

- AWS CLI returns weird errors on non-recursive cp (stream is not seekable)

<Quirk score={2.1}>
Use `aws s3 cp --recursive ./ananas s3://bikinibottom/` instead of `aws s3 cp ./ananas s3://bikinibottom/`.
</Quirk>

- Cloudfront does not support routing policies that go beyond behaviors, errors and default root object.

<Quirk score={3.6}>
Write a Cloudfront function
</Quirk>
