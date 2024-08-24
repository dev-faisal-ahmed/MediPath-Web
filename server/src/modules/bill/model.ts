import { model, Schema, SchemaType } from 'mongoose';
import { IBill } from './interface';
import { IService } from '../service/interface';

const serviceSubSchema = new Schema<IService>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
  },
  { _id: false },
);

const billSchema = new Schema<IBill>(
  {
    patientId: { type: Schema.Types.ObjectId, required: true, ref: 'patient' },
    doctorRefId: { type: Schema.Types.ObjectId, ref: 'doctor' },
    agentRefId: { type: Schema.Types.ObjectId, ref: 'agent' },
    services: { type: [serviceSubSchema], required: true },
    price: { type: Number, required: true, min: 0 },
    discount: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
);

export const Bill = model<IBill>('bill', billSchema);
