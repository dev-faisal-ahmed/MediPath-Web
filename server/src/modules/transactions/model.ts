import { model, Schema } from 'mongoose';
import { ITransaction } from './interface';
import { transactionCategories, transactionTypes } from './constants';

const transactionSchema = new Schema<ITransaction>({
  billId: { type: Schema.Types.ObjectId, ref: 'bill' },
  referrerId: { type: Schema.Types.ObjectId, ref: 'referrers' },
  type: { type: String, enum: transactionTypes, required: true },
  amount: { type: Number, required: true, min: 0 },
  date: { type: Date, default: new Date() },
  description: { type: String },
  category: { type: String, enum: transactionCategories },
});

export const Transaction = model<ITransaction>(
  'transaction',
  transactionSchema,
);
