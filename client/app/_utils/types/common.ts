export type TLoggedUser = {
  _id: string;
  name: string;
  userId: string;
  imageUrl: string;
};

export type TAgeTitle = 'Year' | 'Month' | 'Day' | 'Hour';
export type TGender = 'Male' | 'Female' | 'Other';

export type TPatient = {
  _id: string;
  name: string;
  age: number;
  ageTitle: TAgeTitle;
  gender: TGender;
  phone: string;
  address: string;
};

export type TDoctor = {
  _id: string;
  name: string;
  phone: string;
};

export type TAgent = {
  _id: string;
  name: string;
  phone: string;
};

export type TService = {
  _id: string;
  name: string;
  price: number;
};

export type TServerResponse<TData> = {
  ok: boolean;
  message: string;
  data?: TData;
  error: any;
};
