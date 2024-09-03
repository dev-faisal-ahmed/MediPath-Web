import { IBill } from './interface';
import { model, Schema } from 'mongoose';
import { IService } from '../service/interface';
import { IPatient } from '../patient/interface';
import { ageTitles, genders } from '../patient/constants';

const serviceSubSchema = new Schema<IService>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    roomNo: { type: String, required: true },
  },
  { _id: false },
);

const patientSubSchema = new Schema<Omit<IPatient, '_id'>>(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    ageTitle: { type: String, enum: ageTitles, required: true },
    gender: { type: String, enum: genders, required: true },
    phone: { type: String },
    address: { type: String },
  },
  { _id: false },
);

const billSchema = new Schema<IBill>(
  {
    billId: { type: String, required: true, unique: true },
    referrer: { type: Schema.Types.ObjectId, ref: 'referrer' },
    visitedBy: { type: Schema.Types.ObjectId, ref: 'referrer' },
    patientInfo: { type: patientSubSchema, required: true },
    services: { type: [serviceSubSchema], required: true },
    date: { type: Date, default: new Date() },
    price: { type: Number, required: true, min: 0 },
    paid: { type: Number, required: true, min: 0 },
    discount: { type: Number, default: 0, min: 0 },
    commission: { type: Number },
  },
  { timestamps: true },
);

export const Bill = model<IBill>('bill', billSchema);
