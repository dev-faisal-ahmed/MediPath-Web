import { model, Schema } from 'mongoose';
import { IReferrer } from './interface';
import { referrerTypes } from './constants';

const referrerSchema = new Schema<IReferrer>({
  name: { type: String, required: true },
  designation: { type: String },
  type: { type: String, enum: referrerTypes, required: true },
  isDeleted: { type: Boolean, default: false },
});

export const Referrer = model<IReferrer>('referrer', referrerSchema);
