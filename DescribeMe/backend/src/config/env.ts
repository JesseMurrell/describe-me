import dotenv from 'dotenv';
import AWS from 'aws-sdk';

dotenv.config();

let OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';

if (process.env.ENVIRONMENT === 'prod') {
  const secretsManager = new AWS.SecretsManager();

  const getSecret = async () => {
    try {
      const secret = await secretsManager
        .getSecretValue({ SecretId: 'DescribeMe/prod' })
        .promise();

      if ('SecretString' in secret) {
        const secretValue = JSON.parse(secret.SecretString || '{}');
        OPENAI_API_KEY = secretValue.OPENAI_API_KEY || OPENAI_API_KEY;
      }
    } catch (err) {
      console.error('Error fetching secret from AWS Secrets Manager:', err);
    }
  };

  // Fetch the secret asynchronously (can be awaited if needed)
  getSecret();
}

export const ENVIRONMENT = process.env.ENVIRONMENT || 'dev';
export const PORT = process.env.PORT || '5001';
export { OPENAI_API_KEY };