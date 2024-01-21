import { z } from 'zod';

const loginSchema = z.object({
  username: z.string({ required_error: '"username" and "password" are required' }),
  password: z.string({ required_error: '"username" and "password" are required' }),
});

export default loginSchema;