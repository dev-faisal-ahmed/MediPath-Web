import { model, Schema } from 'mongoose';
import { ITransaction } from './interface';
import { transactionTypes } from './constants';

const transactionSchema = new Schema<ITransaction>({
  billId: { type: Schema.Types.ObjectId, ref: 'bill' },
  type: { type: String, enum: transactionTypes, required: true },
  amount: { type: Number, required: true, min: 0 },
  date: { type: Date, default: new Date() },
  description: { type: String },
});

export const Transaction = model<ITransaction>(
  'transaction',
  transactionSchema,
);
