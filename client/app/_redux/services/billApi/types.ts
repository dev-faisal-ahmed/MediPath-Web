import { TAgent, TDoctor, TPatient, TService } from '@/app/_utils/types';

export type TGenerateBillPayload = {
  patientInfo: Omit<TPatient, '_id'>;
  doctorRefId: string;
  agentRefId: string;
  services: Omit<TService, '_id'>[];
  discount: number;
  pay: number;
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
  pay: number;
};
