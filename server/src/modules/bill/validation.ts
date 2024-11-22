import { z } from 'zod';
import { enumGenerator } from '../../helpers';
import { ageTitles, genders } from '../patient/constants';

// sub schemas
const patientSubSchema = z.object({
  name: z.string().min(1, { message: 'Patient Name is required' }),
  phone: z.string().min(1, { message: 'Phone number is required' }).optional(),
  address: z.string().min(1, { message: 'Address is required' }).optional(),
  age: z.number().min(0, { message: 'Age can not be negative' }),
  ageTitle: enumGenerator(
    ageTitles,
    `AgeTitle is required and it has to be ${ageTitles}`,
  ),
  gender: enumGenerator(
    genders,
    `Gender is required and it has to be ${genders}`,
  ),
});

const serviceSubSchema = z.object({
  name: z
    .string({ required_error: 'Service name is required' })
    .min(1, { message: 'Service name is required' }),
  price: z
    .number({ required_error: 'Price is required' })
    .min(0, { message: 'Price can not be negative' }),
  roomNo: z
    .string({ required_error: 'Room Number is required' })
    .min(1, { message: 'Room number is required' }),
});

// main schemas
export const generateBillValidationSchema = z.object({
  patientInfo: patientSubSchema,
  referrer: z
    .string({ required_error: 'Doctor id is required' })
    .min(1, { message: 'Doctor id is required' })
    .min(24, { message: 'Invalid Id' })
    .optional(),
  visitedBy: z
    .string({ required_error: 'Doctor id is required' })
    .min(1, { message: 'Doctor id is required' })
    .min(24, { message: 'Invalid Id' })
    .optional(),
  services: serviceSubSchema.array(),
  discount: z
    .number()
    .min(0, { message: 'Discount amount can not be negative' })
    .optional(),
  paid: z
    .number({ required_error: 'Payment is required' })
    .min(0, { message: 'Payment can not be negative' }),
  commission: z
    .number()
    .min(0, { message: 'Commission can not be negative' })
    .optional(),
});

export const takeDueValidationSchema = z.object({
  price: z
    .number({ required_error: 'Price is required' })
    .min(0, { message: 'Price can not be negative' }),
});

export const updateCommissionSchema = z.object({
  amount: z.number().min(0, { message: 'Commission can not be negative' }),
});
