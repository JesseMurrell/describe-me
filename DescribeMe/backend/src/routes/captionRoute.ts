import fs from 'fs'
import { Router } from 'express';
import { generateCaption } from '../services/openaiService';
import { convertFileToDataUrl } from '../services/imageService';
import multer from 'multer';

const router = Router();

const tempDirectory = '/tmp/uploads';

const upload = multer({ dest: tempDirectory });

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
    console.log('Converting file to Data URL...');
    const dataUrl = convertFileToDataUrl(filePath, req.file.mimetype);
    console.log('File converted successfully.');

    console.log('Generating caption...');
    const caption = await generateCaption(dataUrl, generation, tone);
    console.log('Caption generated:', caption);

    res.json({ caption });
  } catch (error) {
    console.error('Error generating caption:', error);
    res.status(500).json({ error: 'Failed to generate caption.' });
  } finally {
    console.log('Cleaning up uploaded file...');
    fs.unlink(filePath, (err) => {
      if (err) console.error('Error deleting uploaded file:', err);
      else console.log('Uploaded file deleted successfully.');
    });
  }
});

export default router;