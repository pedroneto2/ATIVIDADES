import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import ordenaLista from './routes/ordenaLista';
import interlace from './routes/interlace';

dotenv.config();

const app = express();
const FRONT_END_URL = process.env.FRONT_END_URL;

app.use(
  cors({
    origin: FRONT_END_URL,
  })
);

app.use(express.json());
app.use('/ordenaLista', ordenaLista);
app.use('/interlace?', interlace);

app.use((error, req, resp, next) => {
  console.log(error);
  resp.status(error.status || 500).json({ message: error.message });
});

export default app;
