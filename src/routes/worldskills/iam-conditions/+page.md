## Table of Contents

## Global condition keys

| Key                          | Category  | Value                                                                                                                      |
| ---------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------- |
| `aws:PrincipalArn`           | Principal | ARN of the calling principal                                                                                               |
| `aws:PrincipalAccount`       | Principal | Account ID of the calling principal                                                                                        |
| `aws:PrincipalOrgID`         | Principal | Org ID the principal belongs to                                                                                            |
| `aws:PrincipalOrgPaths`      | Principal | Org path of the principal (list)                                                                                           |
| `aws:PrincipalTag/<tag-key>` | Principal | Value of tag `<tag-key>` on the principal (dynamic key)                                                                    |
| `aws:PrincipalIsAWSService`  | Principal | `true` \| `false`                                                                                                          |
| `aws:PrincipalServiceName`   | Principal | Service principal name, e.g. `cloudtrail.amazonaws.com`                                                                    |
| `aws:PrincipalType`          | Principal | `Account` \| `User` \| `FederatedUser` \| `AssumedRole` \| `Anonymous`                                                     |
| `aws:userid`                 | Principal | Unique principal ID string                                                                                                 |
| `aws:username`               | Principal | IAM user name                                                                                                              |
| `aws:FederatedProvider`      | Session   | `cognito-identity.amazonaws.com` \| `www.amazon.com` \| `graph.facebook.com` \| `accounts.google.com` \| OIDC provider ARN |
| `aws:TokenIssueTime`         | Session   | ISO 8601 timestamp                                                                                                         |
| `aws:MultiFactorAuthPresent` | Session   | `true` \| `false`                                                                                                          |
| `aws:MultiFactorAuthAge`     | Session   | Seconds since MFA, numeric                                                                                                 |
| `aws:SourceIdentity`         | Session   | String set via `sts:SourceIdentity` on `AssumeRole`                                                                        |
| `ec2:SourceInstanceArn`      | Session   | ARN of the EC2 instance the credentials were delivered to                                                                  |
| `ec2:RoleDelivery`           | Session   | `1.0` \| `2.0` (IMDS version)                                                                                              |
| `lambda:SourceFunctionArn`   | Session   | ARN of the Lambda function                                                                                                 |
| `codebuild:BuildArn`         | Session   | ARN of the CodeBuild build                                                                                                 |
| `codebuild:ProjectArn`       | Session   | ARN of the CodeBuild project                                                                                               |
| `ssm:SourceInstanceArn`      | Session   | ARN of the SSM managed instance                                                                                            |
| `aws:SourceIp`               | Network   | IPv4/IPv6 address                                                                                                          |
| `aws:VpcSourceIp`            | Network   | Private IPv4/IPv6 address inside a VPC                                                                                     |
| `aws:SourceVpc`              | Network   | VPC ID                                                                                                                     |
| `aws:SourceVpcArn`           | Network   | VPC ARN                                                                                                                    |
| `aws:SourceVpce`             | Network   | VPC endpoint ID                                                                                                            |
| `aws:VpceAccount`            | Network   | Account ID owning the VPC endpoint                                                                                         |
| `aws:VpceOrgID`              | Network   | Org ID owning the VPC endpoint                                                                                             |
| `aws:ResourceAccount`        | Resource  | Account ID of the resource                                                                                                 |
| `aws:ResourceOrgID`          | Resource  | Org ID of the resource                                                                                                     |
| `aws:ResourceTag/<tag-key>`  | Resource  | Value of tag `<tag-key>` on the resource (dynamic key)                                                                     |
| `aws:CurrentTime`            | Request   | ISO 8601 timestamp                                                                                                         |
| `aws:EpochTime`              | Request   | Unix seconds, numeric                                                                                                      |
| `aws:RequestedRegion`        | Request   | AWS region code, e.g. `eu-central-1`                                                                                       |
| `aws:SecureTransport`        | Request   | `true` \| `false`                                                                                                          |
| `aws:UserAgent`              | Request   | `User-Agent` HTTP header value                                                                                             |
| `aws:referer`                | Request   | `Referer` HTTP header value                                                                                                |
| `aws:CalledVia`              | Request   | List of AWS service principals in the call chain                                                                           |
| `aws:CalledViaFirst`         | Request   | First service principal in the call chain                                                                                  |
| `aws:CalledViaLast`          | Request   | Last service principal in the call chain                                                                                   |
| `aws:ViaAWSService`          | Request   | `true` \| `false`                                                                                                          |
| `aws:SourceArn`              | Request   | ARN of the resource that triggered the call                                                                                |
| `aws:SourceAccount`          | Request   | Account ID of the resource that triggered the call                                                                         |
| `aws:RequestTag/<tag-key>`   | Request   | Value of tag `<tag-key>` being set in the request (dynamic key)                                                            |
| `aws:TagKeys`                | Request   | List of tag keys present in the request                                                                                    |

## Service-specific keys with fixed value sets

| Key                                  | Value                                                                                                                           |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `ec2:CreateAction`                   | Name of the EC2 API action creating the resource, e.g. `RunInstances`, `CreateVolume`, `CreateSecurityGroup`                    |
| `s3:x-amz-acl`                       | `private` \| `public-read` \| `public-read-write` \| `authenticated-read` \| `bucket-owner-read` \| `bucket-owner-full-control` |
| `s3:x-amz-storage-class`             | `STANDARD` \| `STANDARD_IA` \| `ONEZONE_IA` \| `INTELLIGENT_TIERING` \| `GLACIER` \| `GLACIER_IR` \| `DEEP_ARCHIVE`             |
| `www.amazon.com:user_id`             | `user_id` claim from a Login with Amazon token                                                                                  |
| `www.amazon.com:app_id`              | `app_id` claim from a Login with Amazon token                                                                                   |
| `graph.facebook.com:app_id`          | `app_id` claim from a Facebook token                                                                                            |
| `accounts.google.com:sub`            | `sub` claim from a Google token                                                                                                 |
| `cognito-identity.amazonaws.com:aud` | Cognito identity pool ID                                                                                                        |
| `cognito-identity.amazonaws.com:sub` | Cognito identity ID (per user)                                                                                                  |
| `cognito-identity.amazonaws.com:amr` | Auth method list, e.g. `["authenticated", "cognito-identity.amazonaws.com"]`                                                    |

All other service-specific keys (~1,550 more): [Service Authorization Reference](https://docs.aws.amazon.com/service-authorization/latest/reference/reference_policies_actions-resources-contextkeys.html) or `https://servicereference.us-east-1.amazonaws.com/`.
