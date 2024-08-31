export type TService = {
  _id: string;
  name: string;
  price: number;
  roomNo: string;
};

export type TUpdateServicePayload = {
  serviceId: string;
  serviceInfo: Partial<TService>;
};
