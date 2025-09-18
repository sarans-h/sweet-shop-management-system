import express, {type  Request, type Response } from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import sweetsRoutes from './routes/sweets';

dotenv.config();
const app = express();
app.use(express.json());
app.get('/', (_req: Request, res: Response) => {
    res.send('SweetApiWorkingFine');
});
app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetsRoutes);
export default app;