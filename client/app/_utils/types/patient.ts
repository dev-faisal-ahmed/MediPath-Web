export type TAgeTitle = 'year' | 'month' | 'day' | 'hour';
export type TGender = 'Male' | 'Female' | 'Other';

export type TPatient = {
  name: string;
  age: string;
  ageTitle: TAgeTitle;
  gender: TGender;
  phone: string;
  address: string;
};
