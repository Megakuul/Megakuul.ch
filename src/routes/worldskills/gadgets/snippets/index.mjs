import { diagnostic } from './diagnostic.mjs';

export const handler = async (event, context) => {
  const diagnosticResponse = await diagnostic(event, context);
  if (diagnosticResponse) return diagnosticResponse;

  // Handler code here.
  console.log('Running custom handler code for request', context.awsRequestId);

  return {
    statusCode: 200,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ ok: true, receivedAt: new Date().toISOString() }),
  };
};
