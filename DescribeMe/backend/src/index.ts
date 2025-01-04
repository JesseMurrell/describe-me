// index.ts
import app from './app';
import { PORT, ENVIRONMENT, loadSecrets } from './config/env';
import serverless from 'serverless-http';

let secretsLoaded = false;

// This is the actual “Lambda handler” function
async function lambdaHandler(event: any, context: any) {
  // Only load secrets once per cold start
  if (!secretsLoaded) {
    await loadSecrets();
    secretsLoaded = true;
  }

  // Then pass control to Serverless HTTP (which handles Express routing)
  return serverless(app)(event, context);
}

// If in dev, run locally via Express
if (ENVIRONMENT === 'dev') {
  app.listen(Number(PORT), () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
} else {
  // In prod, export the handler that includes secrets loading
  exports.handler = lambdaHandler;
}