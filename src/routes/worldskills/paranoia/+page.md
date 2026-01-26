<script>
    import Quirk from "../Quirk.svelte";
    import Note from "../Note.svelte";
</script>


## Table of Contents

To clarify once and for all when to use what:

- **Static parameters / secrets**: SSM Parameterstore
- **Dynamic parameters**: SSM AppConfig
- **Rotatable, Replicable or Cross-Account secrets**: Secrets Manager


## Secrets Manager

Secrets Manager is an expensive DynamoDB wrapper with tight database integration and rotation features.

Besides some key-value lookups Secrets Manager provides the following features:

1. Integrated rotation for RDS, Redshift and DocumentDB credentials.
2. Custom rotation via Lambda templates and internal statemachine.
3. Readonly cross-region replication.
4. Live KMS CMK replacement.


### Rotation

TODO

For an example of how to implement rotation, checkout the [lambda rotation templates](https://github.com/aws-samples/aws-secrets-manager-rotation-lambdas/tree/master)

## Parameter Store

SSM Parameterstore is a free alternative to Secrets Manager for Hetzner administrators that cannot afford 0.40$ per month.

To avoid enterprise usage AWS nerfed Parameterstore with the following debufs so they can still recommend Secrets Manager:

1. No database integration features
2. No resource policy (access must be granted via Role)
3. Limited to 4 resp. 8 KB per key
4. No sloppy rotation feature
5. No live KMS CMK rotation
6. No cross region replication
7. Low throughput (40 ops/sec)

*Note that higher throughput can be enabled per region (more expensive but throttles at ~10'000 ops/sec)*


### Notifications

TODO

### Secret Proxy

One of the coolest features of Parameterstore is the Secret Manager reference. 

AWS recommends to separate configuration and secrets, however, you will often find yourself in a situation where you either don't want to initialize multiple clients or where you just want to use builtin `secrets.valueFrom` SSM integrations from ECS or Batch.

Therefore, Parameterstore supports a proxy feature that allows your application to read Secret Manager secrets via the Parameterstore API.

You just have to call `ssm:GetParameter` with the prefix `/aws/reference/secretsmanager/<secret-id>` and the `WithDecryption=True` flag.

*Note that this obviously requires an IAM policy like this:*

```json
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Effect": "Allow",
			"Action": "ssm:GetParameter",
			"Resource": "arn:aws:ssm:us-east-1:111111111111:parameter/aws/reference/secretsmanager/prod/agi/unleash"
		}, {
			"Effect": "Allow",
			"Action": "secretsmanager:GetSecretValue",
			"Resource": "arn:aws:secretsmanager:us-east-1:111111111111:secret:prod/agi/unleash-*"
		}, {
			"Effect": "Allow",
			"Action": "kms:Decrypt",
			"Resource": "arn:aws:kms:us-east-1:111111111111:key/22222222-3333-4444-5555-666666666666"
		}
	]
}
```

## Quirks

