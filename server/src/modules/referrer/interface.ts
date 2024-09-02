import { Schema } from 'mongoose';

export type TReferrerType = 'DOCTOR' | 'AGENT';

export interface IReferrer {
  _id: Schema.Types.ObjectId;
  name: string;
  designation?: string;
  type: TReferrerType;
  isDeleted: boolean;
}
