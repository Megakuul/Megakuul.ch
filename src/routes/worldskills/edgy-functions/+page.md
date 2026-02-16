<script>
    import Quirk from "../Quirk.svelte";
</script>

## Table of Contents

### Python

In the rare case you find yourself writing a python function (please immediately inform your supervisor and tell him this is a generally bad idea), it's important to understand that this is a mess 🗑️

1. First create a template of a function like this:

```python
import os

def lambda_handler(event, context):
    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": json.dumps({"blub": os.environ["BLAB"]})
    }
```

2. Package it and deploy it:

```bash

```

3. Add some important third-party dependencies from the best package manager the world has ever seen:

```bash
pip install python-cowsay
```

4. Remember that pip is a global garbage manager and install it to the hardcoded lambda path:

```bash
pip install python-cowsay -t python/lib/python3.14/site-packages
```

5. Zip the dependency as lambda layer and upload:

```bash
TODO
```

6. Deploy the function and notice how it will fail because it was the wrong python version, os or architecture.

7. Create a docker container to fix the mess:

```docker
TODO
```

8. Deploy to ECR and launch the lambda from this container image:

```bash
TODO
```

9. Switch to Go on AL2023 🗿

### Invocation Types

#### DryRun

Performs a validation that checks if the function version exists and if you have access to invoke it.
Notice that this is a real command to the AWS API (creates a CloudTrail data event) and not just a CLI parameter.

#### Event

Executes asynchron which returns 202 immediately and sends the lambda response to the configured destination (if any).

**Exceptions**: If the function throws or returns a non-zero exit code it is retried up 2 times (invoked 3 times in total with this pattern: `1: 0s 2: 1m 3: 2m`).

#### RequestResponse

Executes synchron and waits for the response; this effectively hijacks the returned event which means it is _NOT_ forwarded to configured event destinations.

**Exceptions**: If the function throws or returns a non-zero exit code it returns a `"FunctionError": "Unhandled"` with an error event type as response and does NOT retry.
Notice that the sdk call still returns a 200 status code (because the AWS execution flow itself was successful).

```

```

```

```

```

```
