import express, {type  Request, type Response } from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.ts';
import sweetsRoutes from './routes/sweets.ts';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(express.json());
app.get('/', (_req: Request, res: Response) => {
    res.send('SweetApiWorkingFine');
});
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetsRoutes);
export default app;