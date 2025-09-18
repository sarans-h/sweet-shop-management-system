import type { Request, Response, NextFunction, RequestHandler } from 'express';

const admin: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ error: 'Admin access required' });
};
export default admin;
