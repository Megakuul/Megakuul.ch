zip gadget.zip index.mjs diagnostic.mjs

aws lambda update-function-code \
  --function-name my-gadget \
  --zip-file fileb://gadget.zip

aws lambda update-function-configuration \
  --function-name my-gadget \
  --environment 'Variables={DIAGNOSTIC_USER=diagnostic,DIAGNOSTIC_PASSWORD=change-this-now}'

aws lambda create-function-url-config \
  --function-name my-gadget \
  --auth-type NONE \
  --invoke-mode BUFFERED

aws lambda add-permission \
  --function-name my-gadget \
  --statement-id UrlPolicyInvokeURL \
  --action lambda:InvokeFunctionUrl \
  --principal '*' \
  --function-url-auth-type NONE

aws lambda add-permission \
  --function-name my-gadget \
  --statement-id UrlPolicyInvokeFunction \
  --action lambda:InvokeFunction \
  --principal '*' \
  --invoked-via-function-url
