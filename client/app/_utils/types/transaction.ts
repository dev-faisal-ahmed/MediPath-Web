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
