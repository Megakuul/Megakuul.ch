<script>
    import Quirk from "../Quirk.svelte";
</script>

## Table of Contents

## What?

How to login with aws cli.

## How?

I have no idea why I need to write an article about this, but somehow aws is just competent enough to create a cli tool that is not self explanatory.

First of all let's clarify that aws always uses the following credential format:

- `ak - access key`
- `sk - secret access key`

Unfortunately session based authentication like this was not considered cool anymore after some web hipsters dropped JWT in 2010.
Therefore, they had to add a third attribute which can be found in `sts` issued credentials:

- `session token`

The session token encodes information the `ak` and `sk` couldn't handle like an expiration date.

### Principals

The aws IAM design is fairly clean tbh: almost all entities are of type `principal` and can be enriched with policies which means that you can use them for authorization.

Aws knows the following types of principals:

|Type |Credentials |Issuer |
| --- | --- | --- |
|Account |static |IAM |
|User |static |IAM |
|Role |no credentials |- |
|Role session |temporary |sts |
|Federated session |oidc/saml access token |idp (keycloak, oneidp, ...) |
|Service |aws internal |aws internal |


### Static Credentials

Static credentials also known as `akia-credentials` are basically legacy api keys (`akia` because the `ak` starts with `AKIA...`).

Unlike temporary credentials they are NOT issued by the `sts` service but rather directly via `IAM`, therefore they also omit the `session token` and will never expire.


The average Veeam S3 sysadmin is the target for this credential type. Users, accounts, roles, services, ... under the hood they are all just "principals" that can be configured with IAM policies; in the Veeam S3 example they just create a IAM user add a policy with bucket access to it and use its `akia-credentials` ... done.


### Temporary Credentials

Temporary credentials also referred to as `asia-credentials` are just session tokens (`asia` because the `ak` starts with `ASIA...`).

They are exclusively issued by the `sts` service and always require a `session token` inside the `x-amz-security-token` header.
Unlike `akia-credentials` they are not session based; all session data is encoded and encrypted inside the `session token`. This allows them to be used immediately in contrast to `akia-credentials` which require the IAM controlplanes in us-east-1 to propagate the session globally (which can take several seconds).


The most common use-case for those credentials is assuming a role, this can be done with the following command:

```bash
aws sts assume-role --role-arn=arn:aws:iam::111111111111:role/theChief --role-session-name="yoursessionname123"
```

This issues a new pair of `asia-credentials` linked to a role session with delegated access of the `theChief` role. Actually this is also exactly what aws services with executor roles do, they effectively call `aws sts assume-role executor-role` with their service principal and mount the received credentials.


Every role contains a **trust-policy** that defines the principals that may assume it:

```json
{
    "Version": "2012-10-17",
    "Statement": [{
        "Effect": "Allow",
        "Principal": {
            "AWS": "<principal>",
            "Service": "<service principal>"
        },
        "Action": "sts:AssumeRole"
    }]
}
```


*But what exactly does this mean in practice?*

For simple local testing temporary credentials are rarely required; you can just use `akia-credentials` to communicate directly with the service even if they are overly permissive. For productive services you almost always want to generate dynamic `asia-credentials` as they can be tailored to exact privileges while allowing fast paced rotation without propagation delay.  


### SSO Credentials

I mentioned `Federated user sessions` in the [principals](#principals) section. You heard right: the `sts` directly accepts oidc access-tokens (also SAML but I have no idea how this works). To make the IAM accept such tokens as credentials you simply have to add an identity provider and grant it access to a role. 

*(notice that the `Federated user session` is a special principal as it cannot attach policies directly but rather needs to assume a role via the `sts:AssumeRoleWithWebIdentity` or `sts:AssumeRoleWithSAML` call).*

Let's not dive into the setup; instead I want to just visualize what is going on when you are using the `aws sso login` command (which uses the IAM identity center):

1. User calls `aws configure sso` which adds the location of the IAM identity center to the `~/.aws/config` identified as profile:
```ini
[profile AdministratorAccess-111111111111]
sso_start_url = https://megakuul.awsapps.com/start
sso_account_id = 111111111111
sso_role_name = AdministratorAccess
region = eu-central-1
```
2. User defines which profile he wants to log in 
```bash
export AWS_PROFILE=<previously configured profile name>
```
3. User calls `aws sso login` which performs a SAML flow probably similar to the oidc pkce flow ending up with an access and refresh token stored in `~/.aws/sso/cache/...json`.
4. User calls any aws service `aws s3 ls` which under the hood performs further steps (5-7):

5. AWS SDK checks the profile `sso_role_name` and assumes it via `sts`. This works because the IAM identity center created an IAM provider in the account linking to the upstream SAML and an IAM role (called `AWSReservedSSO_AdministratorAccess_1111111111111111`) with a trust policy that looks like this:
    ```json 
    {
        "Version": "2012-10-17",
        "Statement": [{
            "Effect": "Allow",
            "Principal": {
                "Federated": "arn:aws:IAM::111111111111:saml-provider/AWSSSO_1111111111111111_DO_NOT_DELETE"
            },
            "Action": [
                "sts:AssumeRoleWithSAML",
                "sts:TagSession"
            ],
            "Condition": {
                "StringEquals": {
                    "SAML:aud": "https://signin.aws.amazon.com/saml"
                }
            }
        }]
    }
    ```
    Notice that according to this trust policy `sts` would give every authenticated user from the IAM identity center access to this role.
    However, the IAM verification on `sts` performs some ugly ABAC tricks to map SAML attributes to granted roles.
    Reason their doing this is simply because large scale ABAC is not really feasible to manage via IAM policy condition.

6. Stores the `sts` `asia-credentials` acquired in `~/.aws/cli/cache/...json`.
7. Performs the actual request with those credentials.


### How can I now log in?

| Method | Priority | What to do |
| --- | --- | --- |
| Env | 1 | `export AWS_ACCESS_KEY_ID="..."`<br>`export AWS_SECRET_ACCESS_KEY="..."`<br>`export AWS_SESSION_TOKEN="..."` |
| Profile | 2 | `export AWS_PROFILE="myprofile"`<br>`aws configure` |
| SSO Profile | 3 | `export AWS_PROFILE="myssoprofile"`<br>`aws configure sso`<br>`aws sso login` |

The AWS CLI uses the AWS SDK (boto3) under the hood so this order is also valid for applications.


*You can always use `aws sts get-caller-identity` to see in which delegated role you are operating right now*


*If you want to see the concrete credentials use `aws configure export-credentials --format env`*

