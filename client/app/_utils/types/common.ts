export type TLoggedUser = {
  _id: string;
  name: string;
  userId: string;
  role: string;
};

export type TServerResponse<TData> = {
  ok: boolean;
  message: string;
  data?: TData;
  error: any;
};
