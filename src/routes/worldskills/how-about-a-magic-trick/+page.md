<script>
    import Quirk from "../Quirk.svelte";
</script>

## Table of Contents

![magictrick](/images/magictrick.gif)

## Tricks

### Abuse the aws cli as json api wrapper 📡

Instead of executing long weird aws cli commands in pipelines or scripts (please generally never do this in production and just use the sdk) analyze the json interface of a function via:

```bash
aws lambda update-function-configuration --generate-cli-skeleton > skeleton.json
```

Remove all unused parameters from `input.json` and perform the operation:

```bash
aws lambda update-function-configuration --cli-input-json file://./skeleton.json
```

You can also automate this to modify the file in multiple steps with jq, e.g.:

```bash
# extract current configuration layers
aws lambda get-function-configuration --function-name Cowsay --output json > current.json
# append ananaslayer to the existing layers
jq '{Layers} | .Layers = map(.[].Arn) | .Layers += ["arn:aws:lambda:eu-central-1:111111111111:layer:AnanasLayer:1"]' current.json > update.json
# update configuration
aws lambda update-function-configuration --function-name Cowsay --cli-input-json file://./update.json
```

### Conquer massive aws cli output with jq ⛵

```bash
# use on large commands to see keys of json layer
aws cloudfront list-distribution | jq ".DistributionList.Items[] | keys"

# use if you already know the specific keys to conquer their value
aws cloudfront list-distribution | jq ".DistributionList.Items[] | {ARN, CacheBehaviors}"

# apply complex filters
aws cloudfront list-distributions | jq '.DistributionList.Items[] | {ARN: .ARN, Paths: .CacheBehaviors.Items[].PathPattern} | select(.Paths | test("/v1.scheduler"))'
```

### Port-forward via SSM 🔌💰

```bash
aws ssm start-session --target <instance-id> --region <my-ec2-region> --document-name AWS-StartPortForwardingSession --parameters '{"portNumber":["80"],"localPortNumber":["42069"]}'
```

### Port-froward via EIC 🔌🏷️

```bash
aws ec2-instance-connect open-tunnel --instance-id i-11111111111111111 --remote-port 80 --local-port 42069
```

### Access to isolated network resources 💲📉

Just add two PrivateLink Endpoints with the following services:

- `com.amazonaws.us-east-1.ssmmessages`
- `com.amazonaws.us-east-1.ssm`

And add a security group that allows ingress on `443` to the endpoints. That's all! You are now officially bankrupt.

(Consulting this document after your insolvency court proceedings? Check out EC2 Instance Connect!).
