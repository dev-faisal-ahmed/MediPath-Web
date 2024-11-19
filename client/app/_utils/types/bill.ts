import { TPatient } from './patient';
import { TReferrer } from './referrer';
import { TService } from './services';

export type TGenerateBillPayload = {
  patientInfo: Omit<TPatient, '_id'>;
  referrer?: string;
  visitedBy?: string;
  services: Omit<TService, '_id'>[];
  discount: number;
  paid: number;
  commission: number;
};

export type TBill = {
  _id: string;
  billId: string;
  patientInfo: Omit<TPatient, '_id'>;
  services: Omit<TService, '_id'>[];
  price: number;
  discount?: number;
  date: Date;
  paid: number;
  commission?: number;
};

export type TBillDetails = {
  _id: string;
  billId: string;
  patientInfo: Omit<TPatient, '_id'>;
  referrer: TReferrer;
  visitedBy: TReferrer;
  services: Omit<TService, '_id'>[];
  price: number;
  discount?: number;
  date: Date;
  paid: number;
  commission?: number;
};

export type TTakeDuePayload = {
  price: number;
  billId: string;
};

export type TUpdateCommissionPayload = {
  amount: string;
  billId: string;
};
