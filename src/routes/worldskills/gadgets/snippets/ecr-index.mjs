import { ecrManager } from './ecr-manager.mjs';

export const handler = async event => {
  const response = await ecrManager(event);
  return (
    response ?? {
      statusCode: 404,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ error: 'Not found' }),
    }
  );
};
