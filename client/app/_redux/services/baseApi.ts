import { axiosBaseQuery } from '@/app/_axios/axiosBaseQuery';
import { serverAddress } from '@/app/_data';
import { createApi } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: serverAddress }),
  endpoints: () => ({}),
});
