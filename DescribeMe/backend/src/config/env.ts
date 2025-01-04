// env.ts
import dotenv from 'dotenv';
import AWS from 'aws-sdk';

dotenv.config();

export const ENVIRONMENT = process.env.ENVIRONMENT || 'prod';
export const PORT = process.env.PORT || '5001';
console.log(ENVIRONMENT)

let OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';

export async function loadSecrets() {
  console.log("Loading secrets from secrets manager")
  if (ENVIRONMENT !== 'dev') {
    console.log(`Environment = ${ENVIRONMENT}, fetching key from Secrets Manager`);
    const secretsManager = new AWS.SecretsManager();
    try {
      console.log("Making secrets manager request")
      const secret = await secretsManager
        .getSecretValue({ SecretId: 'DescribeMe/prod' })
        .promise();

      if ('SecretString' in secret) {
        const secretValue = JSON.parse(secret.SecretString || '{}');
        OPENAI_API_KEY = secretValue["DescribeMe/prod"] || '';
      }
      console.log(`OpenAI key acquired: ${OPENAI_API_KEY.slice(-4)}`);
    } catch (err) {
      console.error("Error fetching secret from AWS Secrets Manager:", err);
    }
  }
}

export function getOpenAIKey(): string {
  return OPENAI_API_KEY;
}