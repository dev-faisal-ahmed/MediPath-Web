import { Schema } from 'mongoose';
import { IService } from '../service/interface';

export interface IBill {
  _id: Schema.Types.ObjectId;
  doctorRefId: Schema.Types.ObjectId;
  agentRefId: Schema.Types.ObjectId;
  patientId: Schema.Types.ObjectId;
  services: IService[];
  price: number;
  discount: number;
}
