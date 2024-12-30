import fs from 'fs';
import path from 'path';

// Define the temporary directory for uploads
const tempDirectory = '/tmp/uploads';

// Ensure the directory exists
try {
  if (!fs.existsSync(tempDirectory)) {
    console.log(`Directory ${tempDirectory} does not exist. Creating it now.`);
    fs.mkdirSync(tempDirectory, { recursive: true });
    console.log(`Directory ${tempDirectory} created successfully.`);
  } else {
    console.log(`Directory ${tempDirectory} already exists.`);
  }
} catch (error) {
  console.error(`Error creating directory ${tempDirectory}:`, error);
}

// Get the full file path in the temporary directory
export function getTempFilePath(fileName: string): string {
  const filePath = path.join(tempDirectory, fileName);
  console.log(`Generated temp file path: ${filePath}`);
  return filePath;
}

// Convert a file to a Data URL
export function convertFileToDataUrl(filePath: string, mimeType: string): string {
  console.log(`Converting file at path: ${filePath} to data URL.`);
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const base64Image = fileBuffer.toString('base64');
    console.log(`File at path: ${filePath} successfully converted to data URL.`);
    return `data:${mimeType};base64,${base64Image}`;
  } catch (error) {
    console.error(`Error converting file at path: ${filePath} to data URL:`, error);
    throw error; // Re-throw the error for further handling
  }
}