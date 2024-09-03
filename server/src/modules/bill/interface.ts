import { Schema } from 'mongoose';
import { IService } from '../service/interface';
import { IPatient } from '../patient/interface';

export interface IBill {
  _id: Schema.Types.ObjectId;
  billId: string;
  referrer: Schema.Types.ObjectId;
  visitedBy: Schema.Types.ObjectId;
  patientInfo: Omit<IPatient, '_id'>;
  services: Omit<IService, '_id'>[];
  date: Date;
  price: number;
  discount: number;
  paid: number;
  commission?: number;
}
