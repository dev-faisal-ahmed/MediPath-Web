import { z } from 'zod';

export const addDoctorValidationSchema = z.object({
  name: z
    .string({ required_error: 'DoctorName is required' })
    .min(1, { message: 'DoctorName is required' }),
  phone: z
    .string({ required_error: 'Phone number is required' })
    .min(1, { message: 'Phone Number is required' }),
});
