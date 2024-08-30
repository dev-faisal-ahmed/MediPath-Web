import { Schema } from 'mongoose';

export type TTransactionType = 'REVENUE' | 'EXPENSE';

export interface ITransaction {
  _id: Schema.Types.ObjectId;
  billId?: Schema.Types.ObjectId;
  type: TTransactionType;
  amount: number;
  date: Date;
  description?: string;
}
