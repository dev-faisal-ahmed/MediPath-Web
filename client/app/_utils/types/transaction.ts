export type TGiveCommissionPayload = {
  amount: number;
  referrerId: string;
  description?: string;
};

export type TAddExpensePayload = {
  amount: number;
  description?: number;
  date: Date;
};

export type TTransactionType = 'REVENUE' | 'EXPENSE';
export type TTransactionCategory =
  | 'SERVICE_REVENUE'
  | 'REFER_EXPENSE'
  | 'UTILITY_EXPENSE';

export type TTransaction = {
  _id: string;
  billId?: string;
  referrerId?: string;
  type: TTransactionType;
  category: TTransactionCategory;
  amount: number;
  date: Date;
  description?: string;
};
