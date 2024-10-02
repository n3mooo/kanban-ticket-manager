import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import ticketRoutes from './routes/ticketRoutes';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

export const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use('/api/tickets', ticketRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});