export type TAgeTitle = 'Year' | 'Month' | 'Day' | 'Hour';
export type TGender = 'Male' | 'Female' | 'Other';

export type TPatient = {
  _id: string;
  name: string;
  age: number;
  ageTitle: TAgeTitle;
  gender: TGender;
  phone?: string;
  address?: string;
};
