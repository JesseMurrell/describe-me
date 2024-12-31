import AWS from 'aws-sdk';
import OpenAI from 'openai';

let openai: OpenAI | null = null;

async function getOpenAIApiInstance() {
  if (!openai) {
    // Start with your environment variable (i.e. if ENVIRONMENT=dev, you may already have a valid .env key)
    let apiKey = process.env.OPENAI_API_KEY || '';

    // If in production, fetch from Secrets Manager
    if (process.env.ENVIRONMENT === 'prod') {
      const secretsManager = new AWS.SecretsManager();
      const secret = await secretsManager
        .getSecretValue({ SecretId: 'DescribeMe/prod' })
        .promise();

      if ('SecretString' in secret) {
        const secretValue = JSON.parse(secret.SecretString || '{}');
        apiKey = secretValue.OPENAI_API_KEY || apiKey;
      }
    }

    openai = new OpenAI({ apiKey });
  }
  return openai;
}

export async function generateCaption(dataUrl: string, generation: string, tone: string): Promise<string> {
  const openai = await getOpenAIApiInstance();

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: `Caption this photo like a ${generation} meme with a ${tone} tone.` },
          { type: "image_url", image_url: { url: dataUrl } }
        ],
      },
    ],
  });

  return response.choices[0]?.message?.content?.trim() ?? 'No caption generated.';
}