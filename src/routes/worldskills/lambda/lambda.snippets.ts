/** Raw Lambda snippet catalogue. Highlighted at build time in +page.server.ts.
 *
 * Rules for the JS blobs: no backticks and no backslashes so they survive being
 * stored inside template literals verbatim. String concat instead of template
 * literals, replaceAll instead of regex. Keep every example comment free.
 */

export interface Snippet {
  id: string;
  title: string;
  /** Short plain-text hint rendered above the code. */
  note?: string;
  js: string;
  py: string;
  /** Override the highlight language for both blobs (used for the JSON envelope). */
  lang?: string;
}

export interface Group {
  id: string;
  title: string;
  blurb: string;
  snippets: Snippet[];
}

const common: Group = {
  id: 'common',
  title: 'Common',
  blurb: 'The three things every project needs pasted in on day one.',
  snippets: [
    {
      id: 'imports',
      title: 'Import everything (the copy-paste block)',
      note: 'Node ships the AWS SDK v3 in the runtime, so no bundling needed. In Python it really is one line: import boto3.',
      js: `import { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand, UpdateCommand, DeleteCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { SQSClient, SendMessageCommand, DeleteMessageCommand } from '@aws-sdk/client-sqs';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { EventBridgeClient, PutEventsCommand } from '@aws-sdk/client-eventbridge';
import { SFNClient, SendTaskSuccessCommand, SendTaskFailureCommand } from '@aws-sdk/client-sfn';
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';
import { KinesisClient, PutRecordCommand } from '@aws-sdk/client-kinesis';
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';
import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';
import { STSClient, GetCallerIdentityCommand } from '@aws-sdk/client-sts';
import { CognitoIdentityProviderClient, AdminGetUserCommand } from '@aws-sdk/client-cognito-identity-provider';
import { ApiGatewayManagementApiClient, PostToConnectionCommand } from '@aws-sdk/client-apigatewaymanagementapi';

const s3 = new S3Client({});
const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const sqs = new SQSClient({});
const sns = new SNSClient({});
const bus = new EventBridgeClient({});
const sfn = new SFNClient({});
const lambda = new LambdaClient({});
const kinesis = new KinesisClient({});
const secrets = new SecretsManagerClient({});
const ssm = new SSMClient({});
const sts = new STSClient({});
const idp = new CognitoIdentityProviderClient({});`,
      py: `import boto3

s3 = boto3.client("s3")
ddb = boto3.resource("dynamodb")
sqs = boto3.client("sqs")
sns = boto3.client("sns")
bus = boto3.client("events")
sfn = boto3.client("stepfunctions")
lam = boto3.client("lambda")
kinesis = boto3.client("kinesis")
secrets = boto3.client("secretsmanager")
ssm = boto3.client("ssm")
sts = boto3.client("sts")
idp = boto3.client("cognito-idp")`,
    },
    {
      id: 'router',
      title: 'Universal HTTP router',
      note: 'Detects REST proxy (v1), HTTP API / Function URL (v2) and ALB, then switches on the templated route (routeKey / method + resource). Non-proxy integrations arrive as your mapping template instead, see below.',
      js: `export const handler = async (event) => {
  const v2 = event.requestContext?.http;
  const alb = event.requestContext?.elb;
  const method = v2?.method ?? event.httpMethod;
  const path = event.rawPath ?? event.path;
  const routeKey =
    event.routeKey ??
    (event.resource ? event.httpMethod + ' ' + event.resource : method + ' ' + path);
  const body = event.isBase64Encoded
    ? Buffer.from(event.body, 'base64').toString()
    : event.body;

  const reply = (statusCode, data) => {
    const base = { statusCode, headers: { 'content-type': 'application/json' }, body: JSON.stringify(data) };
    if (alb) return { ...base, statusDescription: statusCode + ' OK', isBase64Encoded: false };
    if (v2) return { ...base, cookies: [] };
    return base;
  };

  switch (routeKey) {
    case 'GET /health':
      return reply(200, { ok: true, via: v2 ? 'httpv2' : alb ? 'alb' : 'restv1' });
    case 'POST /users':
      return reply(201, { created: JSON.parse(body ?? '{}') });
    case 'GET /users/{id}':
      return reply(200, { id: event.pathParameters?.id });
    default:
      return reply(404, { error: 'no route', routeKey });
  }
};`,
      py: `import base64, json

def handler(event, context):
    v2 = event.get("requestContext", {}).get("http")
    alb = event.get("requestContext", {}).get("elb")
    method = v2["method"] if v2 else event.get("httpMethod")
    path = event.get("rawPath") or event.get("path")
    route_key = event.get("routeKey") or (
        event["httpMethod"] + " " + event["resource"] if event.get("resource") else f"{method} {path}"
    )
    raw = base64.b64decode(event["body"]).decode() if event.get("isBase64Encoded") else event.get("body")

    def reply(status, data):
        base = {"statusCode": status, "headers": {"content-type": "application/json"}, "body": json.dumps(data)}
        if alb:
            return {**base, "statusDescription": f"{status} OK", "isBase64Encoded": False}
        if v2:
            return {**base, "cookies": []}
        return base

    if route_key == "GET /health":
        return reply(200, {"ok": True, "via": "httpv2" if v2 else "alb" if alb else "restv1"})
    if route_key == "POST /users":
        return reply(201, {"created": json.loads(raw or "{}")})
    if route_key == "GET /users/{id}":
        return reply(200, {"id": (event.get("pathParameters") or {}).get("id")})
    return reply(404, {"error": "no route", "routeKey": route_key})`,
    },
    {
      id: 'exec-binary',
      title: 'Execute a bundled / layer binary',
      note: 'Layer files land in /opt, directly bundled files in $LAMBDA_TASK_ROOT. Both are read-only, so copy to /tmp (the only writable dir), chmod +x, run.',
      js: `import { spawnSync } from 'node:child_process';
import { copyFileSync, chmodSync } from 'node:fs';
import { basename } from 'node:path';

const runBinary = (src, args = [], input) => {
  const bin = '/tmp/' + basename(src);
  copyFileSync(src, bin);
  chmodSync(bin, 0o755);
  const r = spawnSync(bin, args, { input, encoding: 'utf8', maxBuffer: 1 << 26 });
  if (r.status !== 0) throw new Error(r.stderr || 'exit ' + r.status);
  return r.stdout;
};

export const handler = async (event) => {
  const out = runBinary('/opt/bin/mytool', ['--flag', event.arg ?? ''], event.stdin);
  return { out };
};`,
      py: `import os, shutil, subprocess

def run_binary(src, args=None, stdin=None):
    dst = "/tmp/" + os.path.basename(src)
    shutil.copyfile(src, dst)
    os.chmod(dst, 0o755)
    r = subprocess.run([dst, *(args or [])], input=stdin, capture_output=True, text=True)
    if r.returncode != 0:
        raise RuntimeError(r.stderr or f"exit {r.returncode}")
    return r.stdout

def handler(event, context):
    return {"out": run_binary("/opt/bin/mytool", ["--flag", event.get("arg", "")], event.get("stdin"))}`,
    },
  ],
};

const incoming: Group = {
  id: 'incoming',
  title: 'Incoming events',
  blurb: 'One tight example per trigger, each touching every field worth knowing.',
  snippets: [
    {
      id: 'in-apigw-rest',
      title: 'API Gateway REST (proxy / v1)',
      js: `export const handler = async (event) => {
  const { httpMethod, path, resource, pathParameters, queryStringParameters, headers, body, isBase64Encoded, requestContext } = event;
  const raw = isBase64Encoded ? Buffer.from(body, 'base64').toString() : body;
  const user = requestContext.authorizer?.claims?.sub ?? requestContext.identity.sourceIp;
  return {
    statusCode: 200,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ httpMethod, path, resource, pathParameters, queryStringParameters, trace: headers['x-trace'], stage: requestContext.stage, user, raw }),
  };
};`,
      py: `import base64, json

def handler(event, context):
    ctx = event["requestContext"]
    raw = base64.b64decode(event["body"]).decode() if event.get("isBase64Encoded") else event.get("body")
    user = ctx.get("authorizer", {}).get("claims", {}).get("sub") or ctx["identity"]["sourceIp"]
    return {"statusCode": 200, "headers": {"content-type": "application/json"}, "body": json.dumps({
        "httpMethod": event["httpMethod"], "path": event["path"], "resource": event["resource"],
        "pathParameters": event.get("pathParameters"), "query": event.get("queryStringParameters"),
        "trace": event["headers"].get("x-trace"), "stage": ctx["stage"], "user": user, "raw": raw})}`,
    },
    {
      id: 'in-apigw-http',
      title: 'API Gateway HTTP API (v2) + Function URL',
      note: 'Function URLs use the exact same payload 2.0 shape. Cookies arrive as an array, method lives under requestContext.http.',
      js: `export const handler = async (event) => {
  const { rawPath, rawQueryString, routeKey, cookies, headers, pathParameters, queryStringParameters, body, isBase64Encoded, requestContext } = event;
  const { method, sourceIp } = requestContext.http;
  const raw = isBase64Encoded ? Buffer.from(body, 'base64').toString() : body;
  return {
    statusCode: 200,
    cookies: ['seen=1; HttpOnly'],
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ method, routeKey, rawPath, rawQueryString, pathParameters, queryStringParameters, cookies, sourceIp, agent: headers['user-agent'], raw }),
  };
};`,
      py: `import base64, json

def handler(event, context):
    http = event["requestContext"]["http"]
    raw = base64.b64decode(event["body"]).decode() if event.get("isBase64Encoded") else event.get("body")
    return {"statusCode": 200, "cookies": ["seen=1; HttpOnly"], "headers": {"content-type": "application/json"}, "body": json.dumps({
        "method": http["method"], "routeKey": event["routeKey"], "rawPath": event["rawPath"],
        "rawQueryString": event["rawQueryString"], "pathParameters": event.get("pathParameters"),
        "query": event.get("queryStringParameters"), "cookies": event.get("cookies"),
        "sourceIp": http["sourceIp"], "agent": event["headers"].get("user-agent"), "raw": raw})}`,
    },
    {
      id: 'in-alb',
      title: 'Application Load Balancer target',
      note: 'ALB does not multi-value-decode unless enabled, and the response must carry statusDescription.',
      js: `export const handler = async (event) => {
  const { httpMethod, path, queryStringParameters, headers, body, isBase64Encoded, requestContext } = event;
  const raw = isBase64Encoded ? Buffer.from(body, 'base64').toString() : body;
  return {
    statusCode: 200,
    statusDescription: '200 OK',
    isBase64Encoded: false,
    headers: { 'content-type': 'application/json', 'set-cookie': 'seen=1' },
    body: JSON.stringify({ httpMethod, path, queryStringParameters, host: headers.host, targetGroup: requestContext.elb.targetGroupArn, raw }),
  };
};`,
      py: `import base64, json

def handler(event, context):
    raw = base64.b64decode(event["body"]).decode() if event.get("isBase64Encoded") else event.get("body")
    return {"statusCode": 200, "statusDescription": "200 OK", "isBase64Encoded": False,
        "headers": {"content-type": "application/json", "set-cookie": "seen=1"},
        "body": json.dumps({"httpMethod": event["httpMethod"], "path": event["path"],
            "query": event.get("queryStringParameters"), "host": event["headers"].get("host"),
            "targetGroup": event["requestContext"]["elb"]["targetGroupArn"], "raw": raw})}`,
    },
    {
      id: 'in-apigw-nonproxy',
      title: 'API Gateway non-proxy (custom integration)',
      note: 'The event is whatever your mapping template built, e.g. { "id": "$input.params(\'id\')", "action": "$input.path(\'$.action\')", "ip": "$context.identity.sourceIp" }. Return a plain object; map errors to status via regex on the thrown message.',
      js: `export const handler = async (event) => {
  const { id, action, ip } = event;
  if (!id) throw new Error('400 id required');
  return { id, action, ip, ts: Date.now() };
};`,
      py: `import time

def handler(event, context):
    if not event.get("id"):
        raise Exception("400 id required")
    return {"id": event["id"], "action": event.get("action"), "ip": event.get("ip"), "ts": int(time.time() * 1000)}`,
    },
    {
      id: 'in-authorizer-rest',
      title: 'Lambda Authorizer (REST — IAM policy)',
      note: 'TOKEN authorizers get authorizationToken, REQUEST authorizers get the full request. Return an IAM policy; context is forwarded to the integration.',
      js: `export const handler = async (event) => {
  const token = event.authorizationToken ?? event.headers?.authorization ?? event.identitySource?.[0];
  const effect = token === 'Bearer let-me-in' ? 'Allow' : 'Deny';
  return {
    principalId: 'user-42',
    policyDocument: { Version: '2012-10-17', Statement: [{ Action: 'execute-api:Invoke', Effect: effect, Resource: event.methodArn }] },
    context: { role: 'admin', tenant: 'acme' },
    usageIdentifierKey: 'api-key-123',
  };
};`,
      py: `def handler(event, context):
    token = event.get("authorizationToken") or (event.get("headers") or {}).get("authorization")
    effect = "Allow" if token == "Bearer let-me-in" else "Deny"
    return {"principalId": "user-42",
        "policyDocument": {"Version": "2012-10-17", "Statement": [{"Action": "execute-api:Invoke", "Effect": effect, "Resource": event["methodArn"]}]},
        "context": {"role": "admin", "tenant": "acme"}, "usageIdentifierKey": "api-key-123"}`,
    },
    {
      id: 'in-authorizer-http',
      title: 'Lambda Authorizer (HTTP v2 — simple)',
      note: 'HTTP APIs accept a simple boolean response when enableSimpleResponses is on.',
      js: `export const handler = async (event) => {
  const token = event.headers.authorization ?? event.identitySource?.[0];
  return {
    isAuthorized: token === 'Bearer let-me-in',
    context: { role: 'admin', tenant: event.headers['x-tenant'] },
  };
};`,
      py: `def handler(event, context):
    token = event["headers"].get("authorization")
    return {"isAuthorized": token == "Bearer let-me-in",
        "context": {"role": "admin", "tenant": event["headers"].get("x-tenant")}}`,
    },
    {
      id: 'in-s3',
      title: 'S3 object event',
      js: `export const handler = async (event) => {
  for (const r of event.Records) {
    const bucket = r.s3.bucket.name;
    const key = decodeURIComponent(r.s3.object.key.replaceAll('+', ' '));
    console.log(r.eventName, r.awsRegion, bucket, key, r.s3.object.size, r.s3.object.eTag, r.eventTime);
  }
};`,
      py: `from urllib.parse import unquote_plus

def handler(event, context):
    for r in event["Records"]:
        obj = r["s3"]["object"]
        key = unquote_plus(obj["key"])
        print(r["eventName"], r["awsRegion"], r["s3"]["bucket"]["name"], key, obj["size"], obj.get("eTag"), r["eventTime"])`,
    },
    {
      id: 'in-sqs',
      title: 'SQS queue (partial batch failure)',
      note: 'Report only the failed messageIds so the rest get deleted. Needs ReportBatchItemFailures on the event source mapping.',
      js: `export const handler = async (event) => {
  const batchItemFailures = [];
  for (const r of event.Records) {
    try {
      const msg = JSON.parse(r.body);
      console.log(r.messageId, msg, r.attributes.ApproximateReceiveCount, r.messageAttributes?.trace?.stringValue, r.eventSourceARN);
    } catch {
      batchItemFailures.push({ itemIdentifier: r.messageId });
    }
  }
  return { batchItemFailures };
};`,
      py: `import json

def handler(event, context):
    failures = []
    for r in event["Records"]:
        try:
            msg = json.loads(r["body"])
            attr = r.get("messageAttributes", {}).get("trace", {}).get("stringValue")
            print(r["messageId"], msg, r["attributes"]["ApproximateReceiveCount"], attr, r["eventSourceARN"])
        except Exception:
            failures.append({"itemIdentifier": r["messageId"]})
    return {"batchItemFailures": failures}`,
    },
    {
      id: 'in-sns',
      title: 'SNS topic notification',
      js: `export const handler = async (event) => {
  for (const r of event.Records) {
    const { TopicArn, Subject, Message, Timestamp, MessageAttributes } = r.Sns;
    console.log(TopicArn, Subject, Timestamp, MessageAttributes?.trace?.Value, JSON.parse(Message));
  }
};`,
      py: `import json

def handler(event, context):
    for r in event["Records"]:
        sns = r["Sns"]
        attr = sns.get("MessageAttributes", {}).get("trace", {}).get("Value")
        print(sns["TopicArn"], sns.get("Subject"), sns["Timestamp"], attr, json.loads(sns["Message"]))`,
    },
    {
      id: 'in-ddb-streams',
      title: 'DynamoDB Streams',
      note: 'unmarshall turns the wire format back into plain objects; NewImage/OldImage depend on StreamViewType.',
      js: `import { unmarshall } from '@aws-sdk/util-dynamodb';

export const handler = async (event) => {
  for (const r of event.Records) {
    const key = unmarshall(r.dynamodb.Keys);
    const before = r.dynamodb.OldImage && unmarshall(r.dynamodb.OldImage);
    const after = r.dynamodb.NewImage && unmarshall(r.dynamodb.NewImage);
    console.log(r.eventName, key, before, after, r.dynamodb.SequenceNumber);
  }
};`,
      py: `from boto3.dynamodb.types import TypeDeserializer

d = TypeDeserializer()
unmarshall = lambda img: {k: d.deserialize(v) for k, v in img.items()}

def handler(event, context):
    for r in event["Records"]:
        ddb = r["dynamodb"]
        before = unmarshall(ddb["OldImage"]) if "OldImage" in ddb else None
        after = unmarshall(ddb["NewImage"]) if "NewImage" in ddb else None
        print(r["eventName"], unmarshall(ddb["Keys"]), before, after, ddb["SequenceNumber"])`,
    },
    {
      id: 'in-kinesis',
      title: 'Kinesis Data Streams',
      note: 'Record data is base64. One Lambda invoke covers many records of one shard.',
      js: `export const handler = async (event) => {
  for (const r of event.Records) {
    const data = Buffer.from(r.kinesis.data, 'base64').toString();
    console.log(r.kinesis.partitionKey, r.kinesis.sequenceNumber, r.kinesis.approximateArrivalTimestamp, data);
  }
};`,
      py: `import base64

def handler(event, context):
    for r in event["Records"]:
        k = r["kinesis"]
        data = base64.b64decode(k["data"]).decode()
        print(k["partitionKey"], k["sequenceNumber"], k["approximateArrivalTimestamp"], data)`,
    },
    {
      id: 'in-eventbridge',
      title: 'EventBridge (rules, scheduled, custom bus)',
      note: 'Scheduled rules arrive with source "aws.events" and detail-type "Scheduled Event" and an empty detail.',
      js: `export const handler = async (event) => {
  const { id, source, 'detail-type': type, detail, time, region, resources, account } = event;
  console.log(id, source, type, account, region, resources, time, detail);
};`,
      py: `def handler(event, context):
    print(event["id"], event["source"], event["detail-type"], event["account"],
          event["region"], event.get("resources"), event["time"], event.get("detail"))`,
    },
    {
      id: 'in-cwlogs',
      title: 'CloudWatch Logs subscription',
      note: 'Payload is gzipped then base64. Great for shipping logs onward.',
      js: `import { gunzipSync } from 'node:zlib';

export const handler = async (event) => {
  const payload = JSON.parse(gunzipSync(Buffer.from(event.awslogs.data, 'base64')).toString());
  for (const e of payload.logEvents) {
    console.log(payload.logGroup, payload.logStream, e.id, e.timestamp, e.message);
  }
};`,
      py: `import base64, gzip, json

def handler(event, context):
    payload = json.loads(gzip.decompress(base64.b64decode(event["awslogs"]["data"])))
    for e in payload["logEvents"]:
        print(payload["logGroup"], payload["logStream"], e["id"], e["timestamp"], e["message"])`,
    },
    {
      id: 'in-kafka',
      title: 'MSK / self-managed Kafka',
      note: 'Records are grouped by "topic-partition"; key and value are base64.',
      js: `export const handler = async (event) => {
  for (const [topicPartition, records] of Object.entries(event.records)) {
    for (const r of records) {
      const value = Buffer.from(r.value, 'base64').toString();
      const key = r.key && Buffer.from(r.key, 'base64').toString();
      console.log(topicPartition, r.partition, r.offset, r.timestamp, key, value);
    }
  }
};`,
      py: `import base64

def handler(event, context):
    for topic_partition, records in event["records"].items():
        for r in records:
            value = base64.b64decode(r["value"]).decode()
            key = base64.b64decode(r["key"]).decode() if r.get("key") else None
            print(topic_partition, r["partition"], r["offset"], r["timestamp"], key, value)`,
    },
    {
      id: 'in-cognito',
      title: 'Cognito trigger',
      note: 'Same handler covers every trigger; branch on triggerSource. You mutate event.response and return the whole event.',
      js: `export const handler = async (event) => {
  console.log(event.triggerSource, event.userPoolId, event.userName, event.request.userAttributes);
  if (event.triggerSource === 'PreSignUp_SignUp') {
    event.response.autoConfirmUser = true;
    event.response.autoVerifyEmail = true;
  }
  if (event.triggerSource.startsWith('TokenGeneration')) {
    event.response.claimsOverrideDetails = {
      claimsToAddOrOverride: { tenant: 'acme' },
      groupOverrideDetails: { groupsToOverride: ['admin'] },
    };
  }
  return event;
};`,
      py: `def handler(event, context):
    src = event["triggerSource"]
    print(src, event["userPoolId"], event.get("userName"), event["request"]["userAttributes"])
    if src == "PreSignUp_SignUp":
        event["response"]["autoConfirmUser"] = True
        event["response"]["autoVerifyEmail"] = True
    if src.startswith("TokenGeneration"):
        event["response"]["claimsOverrideDetails"] = {
            "claimsToAddOrOverride": {"tenant": "acme"},
            "groupOverrideDetails": {"groupsToOverride": ["admin"]}}
    return event`,
    },
    {
      id: 'in-stepfunctions',
      title: 'Step Functions task',
      note: 'Plain JSON in, plain JSON out. The state machine passes the Parameters you configured.',
      js: `export const handler = async (event) => {
  const { orderId, items } = event;
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  return { orderId, total, status: 'PRICED' };
};`,
      py: `def handler(event, context):
    total = sum(i["price"] * i["qty"] for i in event["items"])
    return {"orderId": event["orderId"], "total": total, "status": "PRICED"}`,
    },
    {
      id: 'in-websocket',
      title: 'API Gateway WebSocket',
      note: 'Routes $connect / $disconnect / $default plus your custom actions come through requestContext.routeKey.',
      js: `export const handler = async (event) => {
  const { connectionId, routeKey, domainName, stage } = event.requestContext;
  if (routeKey === '$connect' || routeKey === '$disconnect') return { statusCode: 200 };
  const msg = JSON.parse(event.body ?? '{}');
  console.log(connectionId, routeKey, domainName, stage, msg);
  return { statusCode: 200, body: 'ok' };
};`,
      py: `import json

def handler(event, context):
    ctx = event["requestContext"]
    if ctx["routeKey"] in ("$connect", "$disconnect"):
        return {"statusCode": 200}
    msg = json.loads(event.get("body") or "{}")
    print(ctx["connectionId"], ctx["routeKey"], ctx["domainName"], ctx["stage"], msg)
    return {"statusCode": 200, "body": "ok"}`,
    },
    {
      id: 'in-edge',
      title: 'CloudFront (Lambda@Edge)',
      note: 'Runs in us-east-1, no env vars, small size limits. Mutate and return the request (or response) object.',
      js: `export const handler = async (event) => {
  const req = event.Records[0].cf.request;
  req.headers['x-edge'] = [{ key: 'X-Edge', value: '1' }];
  console.log(req.method, req.uri, req.querystring, req.clientIp);
  return req;
};`,
      py: `def handler(event, context):
    req = event["Records"][0]["cf"]["request"]
    req["headers"]["x-edge"] = [{"key": "X-Edge", "value": "1"}]
    print(req["method"], req["uri"], req["querystring"], req["clientIp"])
    return req`,
    },
    {
      id: 'in-direct',
      title: 'Direct invoke (SDK / CLI / test)',
      note: 'Arbitrary JSON in. The context object carries the request id, deadline and function metadata.',
      js: `export const handler = async (event, context) => {
  console.log(context.awsRequestId, context.functionName, context.functionVersion, context.getRemainingTimeInMillis());
  return { echo: event, at: new Date().toISOString() };
};`,
      py: `from datetime import datetime, timezone

def handler(event, context):
    print(context.aws_request_id, context.function_name, context.function_version, context.get_remaining_time_in_millis())
    return {"echo": event, "at": datetime.now(timezone.utc).isoformat()}`,
    },
  ],
};

const outgoing: Group = {
  id: 'outgoing',
  title: 'Outgoing events',
  blurb: 'What you hand back to the caller, and the events you fire off yourself.',
  snippets: [
    {
      id: 'out-apigw-rest',
      title: 'API Gateway REST (proxy) response',
      note: 'Binary bodies must be base64 with isBase64Encoded, and multiValueHeaders is how you set multiple Set-Cookie headers.',
      js: `export const handler = async () => ({
  statusCode: 200,
  isBase64Encoded: true,
  headers: { 'content-type': 'image/png' },
  multiValueHeaders: { 'set-cookie': ['a=1; HttpOnly', 'b=2'] },
  body: pngBuffer.toString('base64'),
});`,
      py: `import base64

def handler(event, context):
    return {"statusCode": 200, "isBase64Encoded": True, "headers": {"content-type": "image/png"},
        "multiValueHeaders": {"set-cookie": ["a=1; HttpOnly", "b=2"]},
        "body": base64.b64encode(png_bytes).decode()}`,
    },
    {
      id: 'out-apigw-http',
      title: 'API Gateway HTTP (v2) response',
      note: 'Return a bare object or string and v2 auto-wraps it as 200 JSON/text. The explicit form lets you set cookies as an array.',
      js: `export const handler = async () => ({
  statusCode: 201,
  cookies: ['session=abc; HttpOnly; Secure', 'theme=dark'],
  headers: { 'content-type': 'application/json' },
  isBase64Encoded: false,
  body: JSON.stringify({ ok: true }),
});`,
      py: `import json

def handler(event, context):
    return {"statusCode": 201, "cookies": ["session=abc; HttpOnly; Secure", "theme=dark"],
        "headers": {"content-type": "application/json"}, "isBase64Encoded": False,
        "body": json.dumps({"ok": True})}`,
    },
    {
      id: 'out-alb',
      title: 'ALB response',
      note: 'statusDescription is mandatory for ALB targets.',
      js: `export const handler = async () => ({
  statusCode: 200,
  statusDescription: '200 OK',
  isBase64Encoded: false,
  headers: { 'content-type': 'text/html' },
  body: '<h1>ok</h1>',
});`,
      py: `def handler(event, context):
    return {"statusCode": 200, "statusDescription": "200 OK", "isBase64Encoded": False,
        "headers": {"content-type": "text/html"}, "body": "<h1>ok</h1>"}`,
    },
    {
      id: 'out-batch',
      title: 'Partial batch response (SQS / Kinesis / DDB)',
      note: 'Same envelope for all three stream/queue sources with ReportBatchItemFailures enabled.',
      js: `export const handler = async (event) => {
  const failed = event.Records.filter(shouldRetry);
  return { batchItemFailures: failed.map((r) => ({ itemIdentifier: r.messageId })) };
};`,
      py: `def handler(event, context):
    failed = [r for r in event["Records"] if should_retry(r)]
    return {"batchItemFailures": [{"itemIdentifier": r["messageId"]} for r in failed]}`,
    },
    {
      id: 'out-eventbridge',
      title: 'Emit to EventBridge',
      js: `import { EventBridgeClient, PutEventsCommand } from '@aws-sdk/client-eventbridge';
const bus = new EventBridgeClient({});

await bus.send(new PutEventsCommand({
  Entries: [{ EventBusName: 'default', Source: 'app.orders', DetailType: 'OrderPlaced', Detail: JSON.stringify({ orderId: '42', total: 9.99 }) }],
}));`,
      py: `import boto3, json
bus = boto3.client("events")

bus.put_events(Entries=[{
    "EventBusName": "default", "Source": "app.orders", "DetailType": "OrderPlaced",
    "Detail": json.dumps({"orderId": "42", "total": 9.99})}])`,
    },
    {
      id: 'out-sns',
      title: 'Publish to SNS',
      js: `import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
const sns = new SNSClient({});

await sns.send(new PublishCommand({
  TopicArn: process.env.TOPIC,
  Subject: 'order placed',
  Message: JSON.stringify({ orderId: '42' }),
  MessageAttributes: { trace: { DataType: 'String', StringValue: 'abc' } },
}));`,
      py: `import boto3, json, os
sns = boto3.client("sns")

sns.publish(TopicArn=os.environ["TOPIC"], Subject="order placed",
    Message=json.dumps({"orderId": "42"}),
    MessageAttributes={"trace": {"DataType": "String", "StringValue": "abc"}})`,
    },
    {
      id: 'out-sqs',
      title: 'Send to SQS',
      note: 'MessageGroupId / MessageDeduplicationId are required only for FIFO queues.',
      js: `import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
const sqs = new SQSClient({});

await sqs.send(new SendMessageCommand({
  QueueUrl: process.env.QUEUE,
  MessageBody: JSON.stringify({ job: 'resize' }),
  MessageAttributes: { trace: { DataType: 'String', StringValue: 'abc' } },
  MessageGroupId: 'g1',
  MessageDeduplicationId: 'd1',
}));`,
      py: `import boto3, json, os
sqs = boto3.client("sqs")

sqs.send_message(QueueUrl=os.environ["QUEUE"], MessageBody=json.dumps({"job": "resize"}),
    MessageAttributes={"trace": {"DataType": "String", "StringValue": "abc"}},
    MessageGroupId="g1", MessageDeduplicationId="d1")`,
    },
    {
      id: 'out-sfn',
      title: 'Step Functions task token (callback)',
      note: 'For the .waitForTaskToken pattern: resume the paused state machine with success or failure.',
      js: `import { SFNClient, SendTaskSuccessCommand, SendTaskFailureCommand } from '@aws-sdk/client-sfn';
const sfn = new SFNClient({});

await sfn.send(new SendTaskSuccessCommand({ taskToken: event.taskToken, output: JSON.stringify({ done: true }) }));
await sfn.send(new SendTaskFailureCommand({ taskToken: event.taskToken, error: 'Nope', cause: 'validation failed' }));`,
      py: `import boto3, json
sfn = boto3.client("stepfunctions")

sfn.send_task_success(taskToken=event["taskToken"], output=json.dumps({"done": True}))
sfn.send_task_failure(taskToken=event["taskToken"], error="Nope", cause="validation failed")`,
    },
    {
      id: 'out-kinesis',
      title: 'Put record to Kinesis',
      js: `import { KinesisClient, PutRecordCommand } from '@aws-sdk/client-kinesis';
const kinesis = new KinesisClient({});

await kinesis.send(new PutRecordCommand({
  StreamName: process.env.STREAM,
  PartitionKey: 'p1',
  Data: Buffer.from(JSON.stringify({ x: 1 })),
}));`,
      py: `import boto3, json, os
kinesis = boto3.client("kinesis")

kinesis.put_record(StreamName=os.environ["STREAM"], PartitionKey="p1",
    Data=json.dumps({"x": 1}).encode())`,
    },
    {
      id: 'out-invoke',
      title: 'Invoke another Lambda',
      note: 'InvocationType Event = fire-and-forget async, RequestResponse = wait for the result.',
      js: `import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';
const lambda = new LambdaClient({});

const res = await lambda.send(new InvokeCommand({
  FunctionName: 'worker',
  InvocationType: 'RequestResponse',
  Payload: JSON.stringify({ hi: 1 }),
}));
const out = JSON.parse(Buffer.from(res.Payload).toString());`,
      py: `import boto3, json
lam = boto3.client("lambda")

res = lam.invoke(FunctionName="worker", InvocationType="RequestResponse", Payload=json.dumps({"hi": 1}))
out = json.loads(res["Payload"].read())`,
    },
    {
      id: 'out-websocket',
      title: 'Push to a WebSocket client',
      note: 'Point the management client at your API stage, then post by connectionId.',
      js: `import { ApiGatewayManagementApiClient, PostToConnectionCommand } from '@aws-sdk/client-apigatewaymanagementapi';

export const handler = async (event) => {
  const { domainName, stage, connectionId } = event.requestContext;
  const api = new ApiGatewayManagementApiClient({ endpoint: 'https://' + domainName + '/' + stage });
  await api.send(new PostToConnectionCommand({ ConnectionId: connectionId, Data: JSON.stringify({ msg: 'hi' }) }));
  return { statusCode: 200 };
};`,
      py: `import boto3, json

def handler(event, context):
    ctx = event["requestContext"]
    api = boto3.client("apigatewaymanagementapi", endpoint_url=f"https://{ctx['domainName']}/{ctx['stage']}")
    api.post_to_connection(ConnectionId=ctx["connectionId"], Data=json.dumps({"msg": "hi"}))
    return {"statusCode": 200}`,
    },
    {
      id: 'out-destinations',
      title: 'Async destinations (onSuccess / onFailure)',
      note: 'Configured on the function, not in code. The destination (SQS/SNS/EventBridge/Lambda) receives this envelope wrapping your input and result.',
      lang: 'json',
      js: `{
  "version": "1.0",
  "timestamp": "2026-07-31T12:00:00Z",
  "requestContext": { "requestId": "abc", "functionArn": "arn:...:function:fn", "condition": "Success", "approximateInvokeCount": 1 },
  "requestPayload": { "orderId": "42" },
  "responseContext": { "statusCode": 200, "executedVersion": "$LATEST" },
  "responsePayload": { "total": 9.99 }
}`,
      py: `{
  "version": "1.0",
  "timestamp": "2026-07-31T12:00:00Z",
  "requestContext": { "requestId": "abc", "functionArn": "arn:...:function:fn", "condition": "Success", "approximateInvokeCount": 1 },
  "requestPayload": { "orderId": "42" },
  "responseContext": { "statusCode": 200, "executedVersion": "$LATEST" },
  "responsePayload": { "total": 9.99 }
}`,
    },
  ],
};

export const groups: Group[] = [common, incoming, outgoing];

export default groups;
