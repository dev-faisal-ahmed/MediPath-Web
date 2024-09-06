import { z } from 'zod';
import { dateGenerator } from '../../helpers';

export const giveCommissionValidationSchema = z.object({
  referrerId: z.string({}).min(1, { message: 'ReferrerId is required' }),
  amount: z.number().min(0, { message: 'Payment amount can not be negative' }),
  description: z.string().optional(),
});

export const addExpenseValidationSchema = z.object({
  amount: z.number().min(0, { message: 'Amount can not be negative' }),
  description: z.string().optional(),
  date: dateGenerator('Date is required', 'Invalid date'),
});
