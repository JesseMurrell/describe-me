import app from './app';
import { PORT, ENVIRONMENT } from './config/env';
import serverless from 'serverless-http';

if (ENVIRONMENT === 'dev') {
  // Start Express server for local development
  app.listen(Number(PORT), () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
} else {
}

// Export handler for AWS Lambda in production
export const handler = serverless(app);