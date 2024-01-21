import { z } from 'zod';

const ProductSchema = z.object({
  price: z.string({ required_error: '"price" is required', 
    invalid_type_error: '"price" must be a string' })
    .min(3, { message: '"price" length must be at least 3 characters long' }),
  name: z.string({ invalid_type_error: '"name" must be a string', 
    required_error: '"name" is required' })
    .min(3, { message: '"name" length must be at least 3 characters long' }),
});

export default ProductSchema;