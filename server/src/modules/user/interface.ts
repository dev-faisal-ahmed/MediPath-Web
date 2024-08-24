import { Schema } from 'mongoose';

export type TRole = 'ADMIN';
export interface IUser {
  _id: Schema.Types.ObjectId;
  name: string;
  userId: string;
  password: string;
  role: TRole;
}
