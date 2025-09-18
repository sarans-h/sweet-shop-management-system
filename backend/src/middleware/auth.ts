import type { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/User.ts';

const auth: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: string };
    const user = await UserModel.findById(decoded.id);
    if (!user) return res.status(401).json({ error: 'User not found' });
    (req as any).user = user;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
};
export default auth;
