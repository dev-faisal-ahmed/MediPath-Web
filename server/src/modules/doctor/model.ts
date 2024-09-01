import { model, Schema } from 'mongoose';
import { IDoctor } from './interface';

const doctorSchema = new Schema<IDoctor>(
  {
    name: { type: String, required: true, unique: true },
    designation: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Doctor = model<IDoctor>('doctor', doctorSchema);
