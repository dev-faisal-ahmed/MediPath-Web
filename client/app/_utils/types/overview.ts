import { TBill } from './bill';

export type TOverview = {
  collection: number;
  revenue: number;
  due: number;
  commission: number;
  balance: number;
  commissionToBePaid: number;
  utilityExpense: number;
  bills: TBill[];
};

export type TOverViewType = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';

export type TDailyOverview = TOverview & {
  bills: (TBill & { visitedBy: { name: string; designation: string } })[];
};
