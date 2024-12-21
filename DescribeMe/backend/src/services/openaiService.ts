import OpenAI from 'openai';
import { OPENAI_API_KEY } from '../config/env';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export async function generateCaption(dataUrl: string, generation: string, tone: string): Promise<string> {
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