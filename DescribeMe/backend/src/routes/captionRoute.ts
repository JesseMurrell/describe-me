import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import { generateCaption } from '../services/openaiService';
import { convertFileToDataUrl } from '../services/imageService';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), async (req, res): Promise<void> => {
  console.log('Received request with body:', req.body);
  console.log('Received file:', req.file);

  const { generation, tone } = req.body;
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded." });
    return;
  }

  const filePath = req.file.path;

  try {
    const dataUrl = convertFileToDataUrl(filePath, req.file.mimetype);
    const caption = await generateCaption(dataUrl, generation, tone);
    res.json({ caption }); // No `return` here
  } catch (error) {
    console.error('Error generating caption:', error);
    res.status(500).json({ error: 'Failed to generate caption.' }); // No `return` here
  } finally {
    // Cleanup uploaded file
    fs.unlink(filePath, (err) => {
      if (err) console.error('Error deleting uploaded file:', err);
    });
  }
});

export default router;