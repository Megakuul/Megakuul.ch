<script>
    import Quirk from "../Quirk.svelte";
</script>

## Table of Contents

-- WTF is this deployment number (it makes no sense spoiler)

Sample arn for configuration `arn:aws:appconfig:eu-central-1:111111111111:application/<appid>/environment/<envid>/configuration/<configprofilename>`

required params to connect the session / layer:

```
"appconfig:StartConfigurationSession",
"appconfig:GetLatestConfiguration"
```

sample lambda resource pol for validation:

```
Other
appconfig.amazonaws.com
arn:aws:appconfig:eu-central-1:111111111111:application/<appid>/*
lambda:InvokeFunction
```

example validator func:

```javascript
export const handler = async event => {
  const content = JSON.parse(atob(event.content));
  if (!content.IsThatReal) {
    throw 'Invalid configuration; it is not real';
  }
};
```

Takes like 1 Minute to bake (all at once)

## References

- [This demo](https://github.com/aws-samples/aws-lambda-extensions/tree/main/awsappconfig-extension-demo) shows how to use AppConfig in Lambda (with NodeJS).

## Quirks
