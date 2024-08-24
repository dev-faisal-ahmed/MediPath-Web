import { z } from 'zod';

export const loginValidationSchema = z.object({
  userId: z
    .string({ required_error: 'UserId required' })
    .min(1, { message: 'UserId required' }),
  password: z
    .string({ required_error: 'Password required' })
    .min(1, { message: 'Password required' }),
});
