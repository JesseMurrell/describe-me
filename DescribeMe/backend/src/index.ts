import app from './app';
import { PORT } from './config/env';

app.listen(Number(PORT), () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});