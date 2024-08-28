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
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },
  { _id: false },
);

const billSchema = new Schema<IBill>(
  {
    billId: { type: String, required: true, unique: true },
    patientInfo: { type: patientSubSchema, required: true },
    doctorRefId: { type: Schema.Types.ObjectId, ref: 'doctor' },
    agentRefId: { type: Schema.Types.ObjectId, ref: 'agent' },
    services: { type: [serviceSubSchema], required: true },
    price: { type: Number, required: true, min: 0 },
    paid: { type: Number, required: true, min: 0 },
    discount: { type: Number, default: 0, min: 0 },
    date: { type: Date, default: new Date() },
  },
  { timestamps: true },
);

export const Bill = model<IBill>('bill', billSchema);
