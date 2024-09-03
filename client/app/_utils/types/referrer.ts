export type TReferrerType = 'DOCTOR' | 'AGENT';

export type TReferrer = {
  _id: string;
  name: string;
  designation?: string;
  type: TReferrerType;
};

export type TUpdateReferrer = {
  referrerId: string;
  payload: Omit<TReferrer, '_id'>;
};
