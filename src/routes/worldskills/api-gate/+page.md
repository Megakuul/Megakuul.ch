<script>
    import Quirk from "../Quirk.svelte";
    import Note from "../Note.svelte";
</script>

## Table of Contents

<Note type="caution" class="flex flex-col items-center text-center">
    <b class="text-3xl">Warning</b>
    <span>If you are seriously considering using this service for production:</span>
    <img class="rounded-xl w-70 opacity-90" alt="get-some-help" src="/images/stop-it.gif" />
</Note>

### HTTP API

HTTP API is the modern successor to the REST API. While far less complex it is still a large pile of weirdly constructed spaghetti code.

Features:

- **Basic routing**: Allows single segment `{variables}` and greedy end variables via `{proxy+}`
- **Integrations**: Allows routing requests to various backends with very simple request and response parameter remappings.
- **Authorization**: Intercepts requests before the integration is invoked and validates them via either IAM (sigv4), JWT (access token) or a custom Lambda function.
- **CORS**: Allows the gateway to respond to OPTIONS preflights (only global settings per instance and inclusive random behavior).
- **Stages**: Allows creation of different stages that can be manually or automatically updated. Stages work like snapshots of the full instance configuration. Stages live on separate url path prefixes (that are trimmed of before sending to integration however).

#### Integration with Lambda Aliases

A very cool feature is that stages in API gateway support stage variables. Those variables can be configured in the stage panel and then referenced in the integrations (for this example you would create a stage variable called `lambdaAlias` in each stage).

This way you can for example set the Lambda integration ARN like this `arn:aws:lambda:eu-central-1:111111111111:function:Cowsay:${stageVariables.lambdaAlias}`. This allows you to use one integration and route the request to a specific alias based on the gateway stage used.

#### Lambda proxy format example

Input example Payload 1.0

```json
{
  "version": "2.0",
  "routeKey": "$default",
  "rawPath": "/prod/BUMM",
  "rawQueryString": "myquery=dong",
  "headers": {
    "content-length": "0",
    "host": "1111111111.execute-api.eu-central-1.amazonaws.com",
    "origin": "http://supermegabucket.s3-website.eu-central-1.amazonaws.com"
    // ...
  },
  "queryStringParameters": { "myquery": "dong" },
  "requestContext": {
    "accountId": "111111111111",
    "apiId": "2222222222",
    "domainName": "2222222222.execute-api.eu-central-1.amazonaws.com",
    "domainPrefix": "2222222222",
    "http": {
      "method": "OPTIONS",
      "path": "/prod/BUMM",
      "protocol": "HTTP/1.1",
      "sourceIp": "1.1.1.1",
      "userAgent": "some user information shit"
    },
    "requestId": "aIhZagZpliAEJNw=",
    "routeKey": "$default",
    "stage": "prod",
    "time": "12/Mar/2026:23:15:20 +0000",
    "timeEpoch": 1773357320614
  },
  "stageVariables": { "lambdaAlias": "prod" },
  "isBase64Encoded": false
}
```

Output example Payload 1.0 (with Payload 2.0 if it does not match this format it's just interpreted as application/json body)

```json
{
  "statusCode": 200,
  "body": "somebody",
  "headers": {
    "content-type": "application/json"
  },
  "multiValueHeaders": {
    "double-header": ["1", "2"]
  },
  "isBase64Encoded": false
}
```

_(While AWS officially states that they interpret a response as Payload 1.0 format if it "matches" the schema... they actually just check if "statusCode" is set, if yes it is Payload 1.0 if no it is interpreted as body.)_

<Note type="caution">
Attention while AWS has some shim compatibility between Payload 1.0 and 2.0, the <b>multiValueHeaders</b> field is ignored for Payload 2.0 configured lambdas. Instead you have to add multivalue-headers as comma-seperated values to a single header in <b>headers</b>.
<br>
To fix cookie limitation (they already contain quotes and commas in the value). AWS added support for the <b>"cookies": ["cookie1", "cookie2"]</b> block in the Payload 2.0 format.
</Note>

For more example checkout [this](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html)

#### Authorization

The HTTP API supports 4 ways to authorize:

1. **No authorization**: applies when no Authorizer is attached to a route
2. **IAM (built in)**: Checks the SigV4 signature on the request and expects `execute-api:Invoke` (for more information see [here](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-control-access-using-iam-policies-to-invoke-api.html)).
3. **JWT**: Validates a JWT token against a provided JWKS endpoint and checks the audience (very basic).
4. **Lambda**: Provides the authorization header (or any specified request information like `$request.querystring.myquery`) to a lambda function. This function can respond either with an objectified bool `{"isAuthorized":true/false}` in **Simple Mode** or with a full IAM policy which is validated with the procedure from **IAM (built in)** in **IAM Policy Mode**. Functions can use an "authorizer cache" feature which uses the identity source (e.g. authorization header) as cache key for a specified duration. It's important to understand that lambda authorizers are NOT EVEN INVOKED if only ONE of the identity sources is NOT present (e.g. if authorization header is missing).

#### Watch Out 👀

- _OPTIONS preflight returns `204` but no CORS header_: ensure method, header, credentials (cookies, auth header) and origin of the sent request are contained in the CORS configuration (often this can be very finicky especially on origins (e.g. S3 website origin is different from S3 origin)).

- _Your lambda returns something and the Gateway returns something different?_ Check out parameter mappings on the integration

- _The lambda authorizer example from AWS is completely outdated and does not work?_ Use this (the example is for REST API):

```javascript
export const handler = function (event, context) {
  if (
    event.headers.fckapigateway === 'true' ||
    event.identitySource.includes('API GATEWAY SUCKS')
  ) {
    return {
      // this is required and passed down to the integration as $context.authorizer.principalId (otherwise it returns internal error)
      // however, please don't ask why? WTF!? ARE YOU KIDDING ME? NAH NOT REALLY? or something like this...
      principalId: 'ALARRRMmMM',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Action: 'execute-api:Invoke',
            Resource: event.routeArn,
          },
        ],
      },
    };
  } else {
    return {
      principalId: 'bombaclad',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Deny',
            Action: 'execute-api:Invoke',
            Resource: event.routeArn,
          },
        ],
      },
    };
  }
};
```

#### Quirks

- OPTIONS preflight request returns `500` despite CORS settings

<Quirk score={11}>
    There is a route that catches the OPTIONS (e.g. <b>ANY /yourroute</b> or <b>$default</b>) with an active integration or authorization.
    <br>
    Detach the integration / authorization OR remove the route (instead of ANY use explicit methods).
</Quirk>

- Missing route returns `500` instead of `404`

<Quirk score={5.2}>
    There is an autogenerated <b>$default</b> catch-all route without integration.
    <br>
    Remove the route.
</Quirk>

- Internal server error in cross origin request returns CORS error

<Quirk score={6.8}>
    AWS does not return the CORS headers on internal server errors.
    <br>
    Debug with curl.
</Quirk>

### REST API

#### VPC Integration

API Gateways can be integrated into private VPCs in two ways:

- **VPC Links**: Allows the gateway to connect to internal VPC resources by allocating ENIs inside its subnets.
- **Domain name access association**: Allows a domain name to be associated with a private link to allow internal access to the gateway.

#### Lambda proxy format example

Input example no-proxy payload

```json
{}
```

No 🧢 by default REST API Gateway provides the lambda with the body (which in a GET request is literally nothing).
The idea is that you use VTL templates to map your own data for the lambda function.

The response works very similar with no-proxy payloads: You just return the body and then map it with VTL templates.

<br>

Input example with proxy integration

```json
{
  "resource": "/bombaclad",
  "path": "/bombaclad",
  "httpMethod": "GET",
  "headers": {
    "Host": "2222222222.execute-api.eu-central-1.amazonaws.com"
    // ...
  },
  "multiValueHeaders": {
    "Host": ["2222222222.execute-api.eu-central-1.amazonaws.com"]
    // ...
  },
  "queryStringParameters": null,
  "multiValueQueryStringParameters": null,
  "pathParameters": null,
  "stageVariables": { "lambdaAlias": "dev" },
  "requestContext": {
    "resourceId": "ahqgjq",
    "authorizer": {
      "numberKey": "123",
      "booleanKey": "true",
      "stringKey": "stringval",
      "principalId": "user",
      "integrationLatency": 22
    },
    "resourcePath": "/bombaclad",
    "httpMethod": "GET",
    "extendedRequestId": "aIs5cH9uFiAEbsw=",
    "requestTime": "13/Mar/2026:00:33:51 +0000",
    "path": "/dev/bombaclad",
    "accountId": "111111111111",
    "protocol": "HTTP/1.1",
    "stage": "dev",
    "domainPrefix": "2222222222",
    "requestTimeEpoch": 1773362031258,
    "requestId": "3d48b843-e92d-4668-bd4c-c1680eb698e4",
    "identity": {
      "cognitoIdentityPoolId": null,
      "accountId": null,
      "cognitoIdentityId": null,
      "caller": null,
      "sourceIp": "1.1.1.1",
      "principalOrgId": null,
      "accessKey": null,
      "cognitoAuthenticationType": null,
      "cognitoAuthenticationProvider": null,
      "userArn": null,
      "userAgent": "curl/8.17.0",
      "user": null
    },
    "domainName": "2222222222.execute-api.eu-central-1.amazonaws.com",
    "deploymentId": "1nvxk7",
    "apiId": "2222222222"
  },
  "body": null,
  "isBase64Encoded": false
}
```

Output example with proxy integration (must match otherwise it returns 502).

```json
{
  "statusCode": 200,
  "body": "somebody",
  "headers": {
    "content-type": "application/json"
  },
  "multiValueHeaders": {
    "double-header": ["1", "2"]
  },
  "isBase64Encoded": false
}
```

(this is actually Payload 1.0 format also used in old HTTP API versions)

#### Authorizers

There are 5 major ways to integrate authorization in the method request phase:

1. **NONE**: The default, it allows anonymous users to access the gateway depending on resource policy (has to be Principal: "\*" or completely empty to allow anonymous).
2. **API Key**: Attach an API key to the Gateway and tick the box. Now the API only accepts requests with a matching `x-api-key` header. (attention API keys are more like to enforce user limits and not for authorization... they can also be used with the other options in conjunction)
3. **AWS_IAM**: Reads SigV4 from Authorization header or query params (like every other SigV4 verifier). The signature must provide access either via resource policy or identity based policy to the `execute-api:Invoke` action.
4. **Cognito**: Reads a specified header and validates the accesstoken against a Cognito userpool and verifies that it contains the according scope.
5. **Lambda**: Executes a lambda function that returns an IAM policy which then must define the appropriate action like `execute-api:Invoke` to the gateway in order to proceed. An outdated crap example for the authorizers can be found [here](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html).

#### Cognito

For federation access you have to configure your external IDP to redirect back to:

```
https://eu-central-1999999999.auth.eu-central-1.amazoncognito.com/oauth2/idpresponse
```

With your corresponding cognito domain (can also be custom depending on your config - checkout your settings in Branding->Domain)

For further information about cognito endpoints read [this](https://docs.aws.amazon.com/cognito/latest/developerguide/federation-endpoints.html)

Authorization test tab is completely buggy and does not work (probably only works with IDTokens). Just deploy it to dev and test it instead. Bearer or not bearer both works.

#### Watch Out 👀

- _VPC LINK in REST API does not work with ALB_: If you want to route your traffic to an ALB, always ensure that you put an NLB between (NLB that routes to ALB). While the ALB is selectable in the UI it will just cause timeouted 500 errors.

- _Lambda Authorizer does not detect your header / identity source_: Very simple, unlike the HTTP API authorizer, the REST API lambda authorizer requires the raw HEADER as tokensource (e.g. `Authorization`) and no weird format like `method.request.header.Authorization`.

#### Quirks

- CORS preflight works but the actual request fails with a CORS error

<Quirk score={999}>
    The REST API Gateways "CORS" feature does only create a mock for the OPTION method.
    <br>
    Your code has to return CORS headers aswell (API Gateway does NOT inject them).
    <br>
    If you still believe it's a good idea to use this crapware please consult a doctor; you are officially detached from reality.
</Quirk>
