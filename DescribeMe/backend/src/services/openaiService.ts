import OpenAI from 'openai';
import { getOpenAIKey } from '../config/env';

let openai: OpenAI | null = null;

async function getOpenAIApiInstance(): Promise<OpenAI> {
  if (!openai) {
    const apiKey = getOpenAIKey();
    console.log("Creating a new OpenAI instance. Key is empty?", !apiKey);
    openai = new OpenAI({ apiKey });
  }
  return openai;
}

export async function generateCaption(dataUrl: string, generation: string, tone: string): Promise<string> {
  console.log("Attempting to generate caption");
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
  console.log(`Caption response: ${JSON.stringify(response)}`);
  return response.choices[0]?.message?.content?.trim() ?? 'No caption generated.';
}