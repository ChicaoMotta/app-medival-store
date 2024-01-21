import { NextFunction, Request, Response } from 'express';
import loginSchema from '../schemas/loginSchema';
import mapHttpStatus from '../utils/mapHttpStatus';

const validateLogin = (req: Request, res: Response, next: NextFunction): Response | void => {
  const validation = loginSchema.safeParse(req.body);
  
  if (!validation.success) {
    return res.status(mapHttpStatus('INVALID_DATA')).json({
      message: validation.error.issues[0].message,
    });
  } 

  return next();
};

export default validateLogin;