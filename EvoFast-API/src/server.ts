import express from 'express';
import userRoutes from './routes/authRoutes';
import cors from 'cors';

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(userRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta PORT`);
});