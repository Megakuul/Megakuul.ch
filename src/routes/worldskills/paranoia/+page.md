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

Besides the integrated database user rotations the Secrets Manager also allows credential rotation via Lambda.

It supports this process with an internal state machine that is controlled by two internal labels `AWSCURRENT` and `AWSPENDING`.

When calling `secretsmanager:RotateSecret` the state machine is started (or retriggered if already in process). The machine then sequentially invokes the defined lambda with the following steps:

1. `createSecret`: Create the new secret version with `AWSPENDING` label.
2. `setSecret`: Update the secret in your service (e.g. database).
3. `testSecret`: Test the secret with your service.
4. `finishSecret`: Update the secret version stage so that `AWSCURRENT` points to the new secret.

If a step fails (lambda invocation returns a non-zero exit code) the state machine just retries with exponential backoff.
Therefore, all lambda operations must be idempotent!


In this whole process the idea is to set the `AWSPENDING` label to the new key version created in the first step.
This ensures that the Secrets Manager does not allow other key version changes while rotating.


As soon as the key got rotated successfully, the lambda should update the `AWSCURRENT` label to point to the `AWSPENDING` version. 
This finalizes the process and unlocks the Secrets Manager blockade for creating new versions.

*Notice that Secrets Manager aggressively erases old versions; after each rotation it labels the last version with `AWSPREVIOUS` and discards every other unlabeled version.*


For examples of how to implement rotation checkout the [lambda rotation templates](https://github.com/aws-samples/aws-secrets-manager-rotation-lambdas/tree/master)

<Note type="protip">
To cancel an ongoing / failing rotation: call <b>CancelRotateSecret</b> and remove the AWSPENDING label with <b>UpdateSecretVersionStage</b>. 

However, keep in mind that this disables automatic rotation!
</Note>


## Parameter Store

SSM Parameterstore is a free alternative to Secrets Manager for Hetzner administrators that cannot afford 0.40$ per month.

To avoid enterprise usage AWS nerfed Parameterstore with the following debufs so they can still recommend Secrets Manager for secrets:

1. No database integration features
2. No resource policy (access must be granted via Role)
3. Limited to 4 resp. 8 KB per key
4. No sloppy rotation feature
5. No live KMS CMK rotation
6. No cross region replication
7. Low throughput (40 ops/sec)

*Note that higher throughput can be enabled per region (more expensive but throttles at ~10'000 ops/sec)*

### Tick Tock Mr. Wick ⌛

Advanced Parameters can be configured to expire at a certain point in time.

### Notifications

Advanced Parameters can also be configured to emit a notification shortly before the parameter expires or when the parameter is idle (not updated) for a certain time. 

This is very cool as it allows you to scrape more than just the basic "update" events from Eventbridge (e.g. receive an event if your license key is about to expire).

For my use case I've created an Eventrule that sends an SNS message every time the parameter is idle for over 5 hours to remind me of how cool I am:

![paranoia_ssm_message](/images/paranoia_ssm_message.png)

*Haters could argue that we just created an overly complex Eventbridge scheduler.*


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

## Watch Out 👀

<Note type="caution">
For all operations with Secrets Manager or Parameterstore always keep in mind that you need <b>kms:GenerateDataKey</b> or <b>kms:Decrypt</b> access when using an underlying CMK KMS without resource policy grant!

Due to the transitive access, this can often lead to vague permission errors.
</Note>
