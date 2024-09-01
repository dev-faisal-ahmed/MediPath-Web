import { Schema } from 'mongoose';

export interface IDoctor {
  _id: Schema.Types.ObjectId;
  name: string;
  designation:string
}
