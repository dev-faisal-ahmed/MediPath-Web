import { z } from 'zod';

export const addDoctorValidationSchema = z.object({
  name: z.string().min(1, { message: 'DoctorName is required' }),
  designation: z.string().min(1, { message: 'Designation is required' }),
});
