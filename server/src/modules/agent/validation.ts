import { z } from 'zod';

export const addAgentOrUpdateValidationSchema = z.object({
  name: z
    .string({ required_error: 'Agent name is required' })
    .min(1, { message: 'Agent name is required' }),
});
