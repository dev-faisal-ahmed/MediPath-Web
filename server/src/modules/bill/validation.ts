import { z } from 'zod';
import { ageTitles, genders } from '../patient/constants';
import { enumGenerator } from '../../helpers';

// sub schemas
const patientSubSchema = z.object({
  name: z
    .string({ required_error: 'Patient Name is required' })
    .min(0, { message: 'Patient Name is required' }),
  phone: z
    .string({ required_error: 'Phone number is required' })
    .min(0, { message: 'Phone number is required' }),
  address: z
    .string({ required_error: 'Address is required' })
    .min(0, { message: 'Address is required' }),
  age: z
    .number({ required_error: 'Age is required' })
    .min(0, { message: 'Age can not be negative' }),
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
});

// main schemas
export const generateBillValidationSchema = z.object({
  patientInfo: patientSubSchema,
  doctorRefId: z
    .string({ required_error: 'Doctor id is required' })
    .min(1, { message: 'Doctor id is required' })
    .min(24, { message: 'Invalid Id' })
    .optional(),
  agentRefId: z
    .string({ required_error: 'Agent id is required' })
    .min(1, { message: 'Agent id is required' })
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
});
