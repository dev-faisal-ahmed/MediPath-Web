import { z } from 'zod';

export const addServiceValidationSchema = z.object({
  name: z
    .string({ required_error: 'Service name is required' })
    .min(1, { message: 'Service name is required' }),
  price: z
    .number({ required_error: 'Price is required' })
    .min(0, { message: 'Price can not be less than zero' }),
  roomNo: z
    .string({ required_error: 'Room Number is required' })
    .min(1, { message: 'Room number is required' }),
});
