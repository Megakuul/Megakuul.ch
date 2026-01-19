<script>
    import Quirk from "../Quirk.svelte";
</script>


Why the AWS permission system is crazy good.

## Table of Contents


## Objects

|Name |Implementation |
|--- |--- |
|Client| Applications (AWS SDK), AWS Services  |
|Server| AWS Services|

## Rules

|Name |Definition |
|--- |--- |
|Identity-based policy | Egress access from *Client* (applies to users/roles)|
|Session policies| Egress access from *Client* (applies to assumed-roles)|
|Resource-based policy | Ingress access from *Server* (applies to services)|
|S3 ACLs | Legacy ingress access from *Server* (only S3) |
|Permission boundary | IAM security boundary (applies to users/roles)|
|Service control policy| IAM security boundary (applies to accounts)|

## Example

### EC2 S3 Access

![ec2-s3-example](/images/iam_ec2_s3_example.svg)

## Quirks

None this system is actually good.
