import { model, Schema } from 'mongoose';
import { IReferer } from './interface';
import { referrerTypes } from './constants';

const refererSchema = new Schema<IReferer>({
  name: { type: String, required: true },
  designation: { type: String },
  type: { type: String, enum: referrerTypes, required: true },
});

export const Referer = model<IReferer>('referer', refererSchema);
