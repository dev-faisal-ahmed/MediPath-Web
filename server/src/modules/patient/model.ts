import { model, Schema } from 'mongoose';
import { IPatient } from './interface';
import { ageTitles } from './constants';

const patientSchema = new Schema<IPatient>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    ageTitle: { type: String, enum: ageTitles, default: 'Year' },
    address: { type: String, required: true },
    gender: { type: String },
  },
  { timestamps: true },
);

export const Patient = model<IPatient>('patient', patientSchema);
