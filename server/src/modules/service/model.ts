import { model, Schema } from 'mongoose';
import { IService } from './interface';

const serviceSchema = new Schema<IService>(
  {
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true, min: 0 },
    roomNo: { type: String, required: true },
  },
  { timestamps: true },
);

export const Service = model<IService>('service', serviceSchema);
