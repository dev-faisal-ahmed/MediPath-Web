export type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type TSuccessResponse = {
  message: string;
  meta?: TMeta;
  data: unknown;
};

export type TErrorResponse = {
  status: number;
  message: string;
  error: unknown;
};
