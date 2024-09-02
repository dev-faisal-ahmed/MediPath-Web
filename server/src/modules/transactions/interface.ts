import { Schema } from 'mongoose';

export type TTransactionType = 'REVENUE' | 'EXPENSE';
export type TTransactionCategory =
  | 'SERVICE_REVENUE'
  | 'REFER_EXPENSE'
  | 'UTILITY_EXPENSE';

export interface ITransaction {
  _id: Schema.Types.ObjectId;
  billId?: Schema.Types.ObjectId;
  type: TTransactionType;
  category: TTransactionCategory;
  amount: number;
  date: Date;
  description?: string;
}
