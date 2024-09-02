import { z } from 'zod';
import { enumGenerator } from '../../helpers';
import { referrerTypes } from './constants';

export const addRefererValidationSchema = z.object({
  name: z.string().min(1, { message: 'DoctorName is required' }),
  designation: z.string().optional(),
  type: enumGenerator(
    referrerTypes,
    `Referer type is required and it has to ${referrerTypes}`,
  ),
});

export const updateRefererValidationSchema = z.object({
  name: z.string().min(1, { message: 'DoctorName is required' }).optional(),
  designation: z.string().optional(),
  type: enumGenerator(
    referrerTypes,
    `Referer type is required and it has to ${referrerTypes}`,
  ).optional(),
});
