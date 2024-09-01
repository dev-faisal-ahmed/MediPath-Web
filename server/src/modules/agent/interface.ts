import { Schema } from 'mongoose';

export interface IAgent {
  _id: Schema.Types.ObjectId;
  name: string;
}
