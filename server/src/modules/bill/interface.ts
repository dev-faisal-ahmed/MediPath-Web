import { Schema } from 'mongoose';
import { IService } from '../service/interface';
import { IPatient } from '../patient/interface';

export interface IBill {
  _id: Schema.Types.ObjectId;
  billId: string;
  doctorRefId: Schema.Types.ObjectId;
  agentRefId: Schema.Types.ObjectId;
  patientInfo: Omit<IPatient, '_id'>;
  services: Omit<IService, '_id'>[];
  price: number;
  discount: number;
  date: Date;
  paid: number;
}
