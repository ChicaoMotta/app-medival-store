import { NextFunction, Request, Response } from 'express';
import ProductSchema from '../schemas/productSchema';

const validateProductSchema = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void => {
  const result = ProductSchema.safeParse(req.body);
  console.log(result);
  
  if (!result.success) {
    // console.log('entrou no if');
    const errorMessage = result.error.issues[0].message;
    
    let errorHttpStatusCode = 422;
    
    if (errorMessage.includes('required')) {
      // console.log('entrou no if do required');
      errorHttpStatusCode = 400;
    }
    return res.status(errorHttpStatusCode)
      .json({ message: errorMessage });
  }
    
  return next();
};

export default validateProductSchema;