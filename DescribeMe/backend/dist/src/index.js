"use strict";
// import express from 'express';
// import multer from 'multer';
// import cors from 'cors';
// import OpenAI from 'openai';
// import dotenv from 'dotenv';
// import fs from 'fs';
// import path from 'path';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// dotenv.config();
// const app = express();
// const upload = multer({ dest: 'uploads/' });
// const port = 5001;
// app.use(cors());
// app.use(express.json());
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// app.post('/caption', upload.single('file'), async (req, res) => {
//   console.log('Received request with body:', req.body);
//   console.log('Received file:', req.file);
//   const { generation, tone } = req.body;
//   if (!req.file) {
//     res.status(400).json({ error: "No file uploaded." });
//     return;
//   }
//   const filePath = req.file.path;
//   try {
//     // Read the file
//     const fileBuffer = fs.readFileSync(filePath);
//     // Determine MIME type (assuming JPEG for simplicity, adjust as needed)
//     const mimeType = req.file.mimetype; // e.g. "image/jpeg" or "image/png"
//     // Convert to base64
//     const base64Image = fileBuffer.toString('base64');
//     // Create data URL
//     const dataUrl = `data:${mimeType};base64,${base64Image}`;
//     const response = await openai.chat.completions.create({
//       model: "gpt-4o", // Ensure you’re using a model that supports images via data URLs
//       messages: [
//         {
//           role: "user",
//           content: [
//             { 
//               type: "text", 
//               text: `Caption this photo like a ${generation} meme with a ${tone} tone.` 
//             },
//             {
//               type: "image_url",
//               image_url: {
//                 url: dataUrl,
//               },
//             },
//           ],
//         },
//       ]
//     });
//     const caption = response.choices[0]?.message?.content?.trim() ?? 'No caption generated.';
//     res.json({ caption });
//   } catch (error) {
//     console.error('Error generating caption:', error);
//     res.status(500).json({ error: 'Failed to generate caption.' });
//   } finally {
//     // Optionally clean up the uploaded file
//     fs.unlink(filePath, (err) => {
//       if (err) console.error('Error deleting uploaded file:', err);
//     });
//   }
// });
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
app_1.default.listen(Number(env_1.PORT), () => {
    console.log(`Server is running on http://localhost:${env_1.PORT}`);
});
