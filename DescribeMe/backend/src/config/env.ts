import dotenv from 'dotenv';

dotenv.config();

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
export const ENVIRONMENT = process.env.ENVIRONMENT || 'dev';
export const PORT = process.env.PORT || '5001';