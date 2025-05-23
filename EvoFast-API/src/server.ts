  import express from 'express';
  import userRoutes from './routes/authRoutes';
  import eventRoutes from './routes/eventRoutes'
  import cors from 'cors';

  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const PORT = process.env.PORT || 3000;

  app.use(userRoutes);
  app.use(eventRoutes);

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta PORT`);
  });