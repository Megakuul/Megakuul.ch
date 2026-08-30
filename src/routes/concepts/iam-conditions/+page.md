## Two catalogs, not one

Condition keys live in two different places depending on whether they're **global** (work across every service) or **service-specific** (only mean something to one API).

Global keys are enumerated on a single page: [IAM global condition context keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html). There are only a few dozen of them, listed in full below.

Service-specific keys (`ec2:CreateAction`, `dynamodb:LeadingKeys`, `s3:x-amz-acl`, ...) are documented per service in the [Service Authorization Reference](https://docs.aws.amazon.com/service-authorization/latest/reference/reference_policies_actions-resources-contextkeys.html) — one page per service, e.g. [Actions, resources, and condition keys for Amazon EC2](https://docs.aws.amazon.com/service-authorization/latest/reference/list_amazonec2.html). This is why "just list every value for every key" isn't possible, for reasons explained below.

There's also a machine-readable mirror of the same data: [servicereference.us-east-1.amazonaws.com](https://servicereference.us-east-1.amazonaws.com/) returns a JSON index of every service, each pointing at a per-service JSON file with its actions, resources, and condition keys. That's the practical way to get all of them.

---

## Global condition keys

**Principal**

| Key                                            | Type   | What it is                                                              |
| ---------------------------------------------- | ------ | ----------------------------------------------------------------------- |
| `aws:PrincipalArn`                             | ARN    | ARN of whoever's making the request                                     |
| `aws:PrincipalAccount`                         | String | Account ID the principal belongs to                                     |
| `aws:PrincipalOrgID` / `aws:PrincipalOrgPaths` | String | Org / org path the principal belongs to                                 |
| `aws:PrincipalTag/<tag-key>`                   | String | Tag on the principal — dynamic, see below                               |
| `aws:PrincipalIsAWSService`                    | Bool   | True if an AWS service called this directly using its service principal |
| `aws:PrincipalServiceName`                     | String | e.g. `cloudtrail.amazonaws.com`                                         |
| `aws:PrincipalType`                            | String | IAM user / role / service / federated / etc.                            |
| `aws:userid`                                   | String | Requester's unique principal ID                                         |
| `aws:username`                                 | String | IAM user name (not set for roles or root)                               |

**Role session**

| Key                                           | Type        | What it is                                                                                               |
| --------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------- |
| `aws:FederatedProvider`                       | String/ARN  | IdP that issued the federated credentials, e.g. `cognito-identity.amazonaws.com` or an OIDC provider ARN |
| `aws:TokenIssueTime`                          | Date        | When the temp credentials were minted                                                                    |
| `aws:MultiFactorAuthPresent`                  | Bool        | Whether MFA backed the credentials — use `BoolIfExists`, it's absent (not `false`) when not applicable   |
| `aws:MultiFactorAuthAge`                      | Numeric     | Seconds since MFA                                                                                        |
| `aws:SourceIdentity`                          | String      | Source identity set on `AssumeRole`, survives role chaining                                              |
| `ec2:SourceInstanceArn`, `ec2:RoleDelivery`   | ARN/Numeric | Which EC2 instance an instance-profile session came from, IMDSv1 vs v2                                   |
| `lambda:SourceFunctionArn`                    | ARN         | Which Lambda function a session came from                                                                |
| `codebuild:BuildArn` / `codebuild:ProjectArn` | ARN         | Same idea for CodeBuild                                                                                  |
| `ssm:SourceInstanceArn`                       | ARN         | Same idea for SSM managed instances                                                                      |

**Network**

| Key                                  | Type       | What it is                                                          |
| ------------------------------------ | ---------- | ------------------------------------------------------------------- |
| `aws:SourceIp`                       | IP         | Caller's public IP (absent if the call went through a VPC endpoint) |
| `aws:VpcSourceIp`                    | IP         | Caller's private IP inside the VPC, when using a VPC endpoint       |
| `aws:SourceVpc` / `aws:SourceVpcArn` | String/ARN | VPC the request traveled through                                    |
| `aws:SourceVpce`                     | String     | Specific VPC endpoint ID                                            |
| `aws:VpceAccount` / `aws:VpceOrgID`  | String     | Account/org that owns that endpoint                                 |

**Resource**

| Key                                         | Type   | What it is                                   |
| ------------------------------------------- | ------ | -------------------------------------------- |
| `aws:ResourceAccount` / `aws:ResourceOrgID` | String | Account/org the resource lives in            |
| `aws:ResourceTag/<tag-key>`                 | String | Tag on the resource being acted on — dynamic |

**Request**

| Key                                                          | Type         | What it is                                                                                                   |
| ------------------------------------------------------------ | ------------ | ------------------------------------------------------------------------------------------------------------ |
| `aws:CurrentTime`                                            | Date         | Now, ISO 8601                                                                                                |
| `aws:EpochTime`                                              | Numeric      | Now, unix seconds                                                                                            |
| `aws:RequestedRegion`                                        | String       | Region the call targeted                                                                                     |
| `aws:SecureTransport`                                        | Bool         | HTTPS or not                                                                                                 |
| `aws:UserAgent`                                              | String       | HTTP `User-Agent` header                                                                                     |
| `aws:referer`                                                | String       | HTTP `Referer` header                                                                                        |
| `aws:CalledVia` / `aws:CalledViaFirst` / `aws:CalledViaLast` | String(list) | Chain of AWS services that proxied the call for you                                                          |
| `aws:ViaAWSService`                                          | Bool         | True if an AWS service made the call on your behalf                                                          |
| `aws:SourceArn` / `aws:SourceAccount`                        | ARN/String   | The resource that triggered a service-to-service call, e.g. the S3 bucket ARN behind an S3→Lambda invocation |
| `aws:RequestTag/<tag-key>`                                   | String       | Tag key/value being attached in _this_ request — dynamic                                                     |
| `aws:TagKeys`                                                | String(list) | The set of tag keys in this request — dynamic                                                                |

That's the complete global list (AWS occasionally adds one — `aws:AssumedRoot`, `aws:SignInSessionArn`, and `identitystore:UserId` are recent additions). A handful of keys — `aws:PrincipalAccount`, `aws:ResourceAccount`, `aws:SourceVpce`, `aws:VpceAccount`, etc. — are flagged by AWS as **never use with wildcards**, because a substring match against an account ID or VPC endpoint ID can silently match more than you think.

---

## Service-specific keys: why "every value for every key" isn't a real document

I pulled the entire machine-readable catalog to check. There is no dataset shaped like "condition key → list of valid values." Here's what actually exists, and the real numbers:

```bash
# the index
curl -s https://servicereference.us-east-1.amazonaws.com/ | jq length
# → 455  (AWS service reference entries, more granular than "AWS has ~300 services")

# pull every service's condition keys
curl -s https://servicereference.us-east-1.amazonaws.com/ \
  | jq -r '.[].url' \
  | xargs -P 20 -I{} sh -c 'curl -s "{}" -o /tmp/svcjson/$(basename "{}")'

jq -s '[.[] | .ConditionKeys[]?.Name] | unique | length' /tmp/svcjson/*.json
# → 1556 unique condition key names across all 455 services

jq -s '[.[] | .ConditionKeys[]?.Types[]] | group_by(.) | map({(.[0]): length}) | add' /tmp/svcjson/*.json
# → { "String": 1641, "ArrayOfString": 503, "ARN": 174, "ArrayOfARN": 27,
#     "Bool": 117, "Numeric": 80, "Date": 4, "IPAddress": 1 }
```

Every entry in that catalog looks like this — a name and a **type**, never a value list:

```json
{ "Name": "ec2:CreateAction", "Types": ["String"] }
{ "Name": "s3:x-amz-storage-class", "Types": ["String"] }
{ "Name": "dynamodb:LeadingKeys", "Types": ["ArrayOfString"] }
```

`String` doesn't mean "one of a fixed set" — it means "compared with a string operator against whatever the service puts into the request context for that call." For the overwhelming majority of the 1,641 `String`-typed keys, that value is unbounded: an instance ID, a bucket name, a role ARN as a string, an API action name, a free-text tag value. There is no closed set to enumerate, so no document — official or otherwise — lists "every possible value," because for most keys that set doesn't exist.

### Where real enums _do_ exist (and where they're documented)

A minority of keys really do take one of a small fixed set of literal strings. Those live scattered across each **feature's own docs**, not the condition-key catalog, e.g.:

- **`ec2:CreateAction`** — its value is the literal name of the EC2 API action that's creating the resource (`RunInstances`, `CreateVolume`, `CreateSecurityGroup`, ...). The enumerable part — which EC2 actions support tag-on-create at all — is listed on [Grant permission to tag Amazon EC2 resources during creation](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/supported-iam-actions-tagging.html), used like this:

  ```json
  {
    "Effect": "Allow",
    "Action": ["ec2:CreateTags"],
    "Resource": "arn:aws:ec2:us-east-1:111122223333:*/*",
    "Condition": {
      "StringEquals": { "ec2:CreateAction": "RunInstances" }
    }
  }
  ```

- **`s3:x-amz-acl`** — one of S3's canned ACL values (`private`, `public-read`, `public-read-write`, `authenticated-read`, `bucket-owner-read`, `bucket-owner-full-control`, ...), documented on the [canned ACL page](https://docs.aws.amazon.com/AmazonS3/latest/userguide/acl-overview.html#canned-acl), not the condition-key reference.
- **`s3:x-amz-storage-class`** — one of the storage-class constants (`STANDARD`, `STANDARD_IA`, `INTELLIGENT_TIERING`, `GLACIER`, `DEEP_ARCHIVE`, ...) from the [storage classes page](https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html).
- Anything typed **`Bool`** (117 of them) is trivially "true or false."

For the full, accurate, current raw catalog — 455 services, ~22k actions, 1,556 condition keys, each with its type — pull it yourself with the script above. It updates the moment AWS ships a new service. A hand-written "these 1,556 keys take these values" table isn't included here, because for most of them that value list doesn't exist anywhere, including inside AWS.

---

## `www.amazon.com:user_id`

This is from **web identity federation** — the manual, pre-Cognito way of doing `sts:AssumeRoleWithWebIdentity` directly against a third-party IdP like Login with Amazon, Facebook, or Google. AWS still supports it; Cognito is just the recommended wrapper around the same mechanism now.

The pattern: your app authenticates the user against the IdP, gets back a token, and calls `AssumeRoleWithWebIdentity` with that token. IAM parses whatever claims the token carries and exposes **each claim as a condition key named `<idp-domain>:<claim-name>`**. So `www.amazon.com:user_id` is the `user_id` field from the token Login with Amazon returned, and `www.amazon.com:app_id` is the app ID field from the same token. Facebook and Google tokens get the equivalent treatment (`graph.facebook.com:app_id`, `accounts.google.com:sub`, etc.) — same mechanism, different domain prefix and claim names because each IdP's token shape differs.

Cognito Identity Pools use exactly this same trick, just with its own claim set — this is a real trust-policy example straight from the docs:

```json
{
  "Version": "2012-10-17",
  "Statement": {
    "Effect": "Allow",
    "Principal": { "Federated": "cognito-identity.amazonaws.com" },
    "Action": "sts:AssumeRoleWithWebIdentity",
    "Condition": {
      "StringEquals": {
        "cognito-identity.amazonaws.com:aud": "us-east:12345678-ffff-ffff-ffff-123456"
      }
    }
  }
}
```

`cognito-identity.amazonaws.com:aud` = the identity pool ID, `...:sub` = the per-user Cognito identity ID, `...:amr` = which auth method/provider was used to log in. Same idea as `www.amazon.com:user_id`, just newer and centrally documented under [Cognito's condition keys](https://docs.aws.amazon.com/service-authorization/latest/reference/list_amazoncognitoidentity.html) instead of the legacy manual-federation docs.

---

## Can I create a condition key from a custom header?

Not with a generic HTTP header — that's not something IAM lets you hook into. IAM only surfaces two specific headers as condition keys: `aws:UserAgent` (`User-Agent`) and `aws:referer` (`Referer`). Both are set by the caller, both are trivially spoofable, and AWS explicitly recommends against using either as a security boundary — treat them as hints, not access control.

There are three genuinely dynamic mechanisms:

1. **Tag-based keys** — `aws:RequestTag/<anything>`, `aws:ResourceTag/<anything>`, `aws:PrincipalTag/<anything>`. The suffix after the slash is whatever tag key you choose, not a fixed AWS list. Tag a role with `department=payments` and `aws:PrincipalTag/department` exists in every policy evaluation for sessions from that role. This is the actual "create your own condition key" mechanism, and it's what ABAC (attribute-based access control) is built on. Combine with `aws:TagKeys` to lock down which tag keys are even allowed in a request.

2. **IdP claims** — as above with `www.amazon.com:user_id`. If you run your own OIDC provider and put a custom claim `department: payments` in the token, `AssumeRoleWithWebIdentity` exposes it as `your-idp-domain:department` automatically. You're not limited to the standard claim names — whatever your IdP puts in the token becomes a usable condition key.

3. **Cross-service context keys** — the `ec2:SourceInstanceArn` / `lambda:SourceFunctionArn` / `codebuild:BuildArn` style keys further up. AWS services inject these into the request context on your behalf when their compute delivers you credentials; you don't create them, but they're the closest thing to "arbitrary metadata about who's really calling," short of tags and IdP claims.

If what you actually want is "gate a request on some custom HTTP header I control" — that's not IAM's job at all. That's API Gateway resource policies / Lambda authorizers / CloudFront Functions / WAF territory, a completely separate layer that runs before or alongside IAM, not a condition key.

---

## Summary

- Global keys: fully enumerated above, ~50 total, [source](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html).
- Service-specific keys: [Service Authorization Reference](https://docs.aws.amazon.com/service-authorization/latest/reference/reference_policies_actions-resources-contextkeys.html) for humans, [servicereference.us-east-1.amazonaws.com](https://servicereference.us-east-1.amazonaws.com/) for machines — 455 services, ~1,556 unique keys, each with a **type**, never an enumerated value list, because most don't have one.
- The exceptions (`ec2:CreateAction`, `s3:x-amz-acl`, `s3:x-amz-storage-class`, ...) have their fixed value sets documented on their own feature pages, not centrally.
- `www.amazon.com:user_id` and friends = raw IdP token claims from manual web identity federation, same trick Cognito uses under `cognito-identity.amazonaws.com:*`.
- Real "make your own condition key": tags (`aws:RequestTag/*`, `aws:ResourceTag/*`, `aws:PrincipalTag/*`) or custom OIDC claims. Not arbitrary headers — that's `aws:UserAgent`/`aws:referer` only, and neither is trustworthy for access control.
