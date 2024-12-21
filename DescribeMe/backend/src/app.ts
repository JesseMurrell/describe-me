import express from 'express';
import cors from 'cors';
import captionRoute from './routes/captionRoute';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/caption', captionRoute);

export default app;