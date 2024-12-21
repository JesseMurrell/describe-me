import fs from 'fs';

export function convertFileToDataUrl(filePath: string, mimeType: string): string {
  const fileBuffer = fs.readFileSync(filePath);
  const base64Image = fileBuffer.toString('base64');
  return `data:${mimeType};base64,${base64Image}`;
}