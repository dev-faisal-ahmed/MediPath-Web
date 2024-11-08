export type TLoggedUser = {
  _id: string;
  name: string;
  userId: string;
  role: string;
};

type TMeta = {
  page: number;
  totalPages: number;
  limit: number;
  total: number;
};

export type TServerResponse<TData> = {
  ok: boolean;
  message: string;
  data?: TData;
  meta?: TMeta;
  error: any;
};
