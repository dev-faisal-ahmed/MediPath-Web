import { TAgent, TPatient } from './common';
import { TDoctor } from './doctor';
import { TService } from './services';

export type TGenerateBillPayload = {
  patientInfo: Omit<TPatient, '_id'>;
  doctorRefId: string;
  agentRefId: string;
  services: Omit<TService, '_id'>[];
  discount: number;
  paid: number;
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
};

export type TBillDetails = {
  _id: string;
  billId: string;
  patientInfo: Omit<TPatient, '_id'>;
  doctorRefId?: TDoctor;
  agentRefId?: TAgent;
  services: Omit<TService, '_id'>[];
  price: number;
  discount?: number;
  date: Date;
  paid: number;
};

export type TTakeDuePayload = {
  price: number;
  billId: string;
};
