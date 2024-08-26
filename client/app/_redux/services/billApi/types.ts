import { TPatient, TService } from '@/app/_utils/types';

export type TGenerateBillPayload = {
  patientInfo: Omit<TPatient, '_id'>;
  doctorRefId: string;
  agentRefId: string;
  services: Omit<TService, '_id'>[];
  discount: number;
};
