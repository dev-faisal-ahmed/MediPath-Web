import { TTransaction } from './transaction';
import { TBill } from './bill';

export type TReferrerType = 'DOCTOR' | 'AGENT';

export type TReferrer = {
  _id: string;
  name: string;
  designation?: string;
  type: TReferrerType;
};

export type TReferrerDetails = TReferrer & {
  commission: number;
  paid: number;
};

export type TBillsInReferrerDetailsPage = Pick<
  TBill,
  '_id' | 'patientInfo' | 'date' | 'price' | 'paid' | 'discount' | 'commission'
>;

// this will be used in referrer details page
export type TReferrerInfo = TReferrer & {
  commissionDemand: number;
  totalCommissionPaid: number;
  referred: TBillsInReferrerDetailsPage[];
  visited: TBillsInReferrerDetailsPage[];
  transactions: TTransaction[];
};

export type TUpdateReferrer = {
  referrerId: string;
  payload: Omit<TReferrer, '_id'>;
};
