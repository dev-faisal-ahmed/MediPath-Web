import { Schema } from 'mongoose';

export type TAgeTitle = 'Year' | 'Month' | 'Day' | 'Hour';
export type TGender = 'Male' | 'Female' | 'Others';

export interface IPatient {
  _id: Schema.Types.ObjectId;
  name: string;
  phone?: string;
  address?: string;
  age: number;
  ageTitle: TAgeTitle;
  gender: TGender;
}
