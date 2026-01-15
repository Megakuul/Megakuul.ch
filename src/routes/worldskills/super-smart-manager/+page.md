<script>
    import Quirk from "../Quirk.svelte";
</script>

Neat magictricks on AWS System Manager.

## Table of Contents

## Tricks 

### Port-forward via SSM

```bash
aws ssm start-session --target <instance-id> --region <my-ec2-region> --document-name AWS-StartPortForwardingSession --parameters '{"portNumber":["80"],"localPortNumber":["42069"]}'
```
