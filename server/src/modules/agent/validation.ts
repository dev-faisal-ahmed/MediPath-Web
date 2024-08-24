import { z } from 'zod';

export const addAgentValidationSchema = z.object({
  name: z
    .string({ required_error: 'Agent name is required' })
    .min(1, { message: 'Agent name is required' }),
  phone: z
    .string({ required_error: 'Phone number is required' })
    .min(1, { message: 'Phone number is required' }),
});
