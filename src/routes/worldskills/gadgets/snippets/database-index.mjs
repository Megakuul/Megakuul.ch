import { databaseWorkbench } from './database-workbench.mjs';

export const handler = async (event, context) => {
  const response = await databaseWorkbench(event, context);
  if (response) return response;

  return {
    statusCode: 404,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ error: 'Open /web or invoke with gadget: database-query' }),
  };
};
