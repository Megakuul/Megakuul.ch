<script>
    import Quirk from "../Quirk.svelte";
</script>


## Table of Contents

## Authentication

All "modern" AWS API calls which are authorized via IAM policies must be authenticated via `SigV4`.

`SigV4` is effectively a signing process on the request using a key derived from the `Secret Access Key`.

The process ensures that the request body and headers are hashed and included in the signature to prevent any tampering. 


In most requests the `SigV4` is [inside the Authorization-Header](https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-auth-using-authorization-header.html), however, the signature can also be [encoded in the url query params](https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-query-string-auth.html) (also known as presigned urls) -> this is often used for external S3 access.



## Authorization

AWS manages authorization exclusively via the IAM service. This service differs fundamentally from classic `IGDLA`-style RBAC systems (like Windows, Kubernetes or Google Cloud) by not automatically resolving the `Identity -> Group -> Role -> Policies` chain. 


Instead, they require an "identity-jump" (`assume-role`) to basically impersonate a role. This delegation system ensures that your access is limited to the exact role you assumed (which can be further downprivileged by creating a `session policy` (`aws sts assume-role --policy=./session.json`) acting as subset of the role permission).


*Notice that you can only assume ONE role, it is not possible to merge policies from different roles... you have to jump 🕳️*


### Entities

Looking at AWS through the IAM authorization lens, there are essentially two different entity-types.

|Name |Implementation |
|--- |--- |
|Client| Applications (AWS SDK), AWS Services  |
|Server| AWS Services|

### Rules

Between those two entities there are different rules that can manage authorization.


|Name |Definition |
|--- |--- |
|Identity-based policy | Egress access from *Client* (applies to users/roles)|
|Session policies| Egress access from *Client* (applies to assumed-roles)|
|Resource-based policy | Ingress access to *Server* (applies to services)|
|S3 ACLs | Legacy ingress access to *Server* (only S3) |
|Permission boundary | IAM egress boundary feature (applies to selected users/roles)|
|Service control policy| IAM egress boundary feature (applies to account principals)|
|Resource control policy| IAM ingress boundary feature (applies to account resources)|


The basic mental model for those rules (except the boundaries) is that they are `OR` joined (with exception from `Deny` which always takes precedence).

More specifically those rules actually follow a pipeline that looks like this:

![iam_pipeline_normal](/images/iam_pipeline_normal.svg)

*Notice that if you are using a resource policy on account/role principals permission boundaries are still evaluated!*



Gemini yappin about boundaries:
![gemini_yappin_about_iam](/images/gemini_yappin_about_iam.png)

Once you understand what I've just explained, you will realize that AGI is still just "internal achieved" 💀


#### Exceptions

There are exactly `1+2 golden exceptions` to the pipeline above:

1. **Cross-account access**

This scenario is special as it strictly requires `AND` joined permissions (identity based AND resource based policies must permit access).


1. **AWS KMS access**
2. **AWS IAM trust access**

KMS and IAM trust access is also special; they don't require `AND` joined permissions BUT must be granted by the **resource policy**!

*Notice that for both KMS and IAM trust you can also create a resource policy that grants access to your AWS account principal. This will effectively provide your IAM with the capability to issue identity-based policies to access those resources.*


![iam_pipeline_trust](/images/iam_pipeline_trust.svg)


*There is a very good explanation [here](https://www.youtube.com/watch?v=71-Gjo6a5Cs)*

## Examples

### EC2 S3 Access

Here is a practical example of this authentication flow for S3 access from an EC2 instance.

![ec2-s3-example](/images/iam_ec2_s3_example.svg)


## Quirks

None, this system is actually good.
