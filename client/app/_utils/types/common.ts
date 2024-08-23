export type TLoggedUser = {
  _id: string;
  name: string;
  userId: string;
  imageUrl: string;
};

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

export type TDoctor = {
  name: string;
  phone: string;
};

export type TAgent = {
  name: string;
  phone: string;
};
