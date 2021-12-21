import express from 'express';
import dotenv from 'dotenv';
import initDBConnection from './configs/database';
import routes from './routes';
import cors from 'cors';

const app = express();
dotenv.config();

initDBConnection();

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
); // Liberando acesso SOMENTE para o localhost:3000!!!

app.use('/api', routes);

app.use((error, req, resp, next) => {
  console.log(error);
  resp.status(error.status || 500).json({ message: error.message });
});

app.listen(process.env.PORT, () => console.log(`App running on port ${process.env.PORT}`));
