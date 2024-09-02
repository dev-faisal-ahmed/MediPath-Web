import { Schema } from 'mongoose';

export type TReferrerType = 'DOCTOR' | 'AGENT';

export interface IReferer {
  _id: Schema.Types.ObjectId;
  name: string;
  designation?: string;
  type: TReferrerType;
}
