import { Schema } from 'mongoose';

export type TAgeTitle = 'Year' | 'Month' | 'Day' | 'Hour';

export interface IPatient {
  _id: Schema.Types.ObjectId;
  name: string;
  phone: string;
  address: string;
  age: number;
  ageTitle: TAgeTitle;
}
