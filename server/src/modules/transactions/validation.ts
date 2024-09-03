import { z } from 'zod';

export const giveCommissionValidationSchema = z.object({
  referrerId: z.string({}).min(1, { message: 'ReferrerId is required' }),
  amount: z.number().min(0, { message: 'Payment amount can not be negative' }),
  description: z.string().optional(),
});
