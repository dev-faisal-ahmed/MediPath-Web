import { z } from 'zod';

export const addBillSchema = z.object({
  name: z.string().min(1, { message: 'Patient Name is required' }),
  age: z.string().min(1, { message: 'Patient Age is required' }),
  gender: z.string({ required_error: 'Gender is required' }),
  ageTitle: z.string({ required_error: 'Age Title is required' }),
  phone: z.string().min(2, { message: 'Phone Number is required' }),
  address: z.string().min(2, { message: 'Address is required' }),
});

export type TAddBillSchema = z.infer<typeof addBillSchema>;
