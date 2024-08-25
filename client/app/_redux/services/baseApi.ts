import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAccessTokenAction } from '@/app/_actions';
import { serverAddress } from '@/app/_data';

const baseQuey = fetchBaseQuery({
  baseUrl: `${serverAddress}`,
  prepareHeaders: async (headers) => {
    const token = await getAccessTokenAction();
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQuey,
  endpoints: () => ({}),
  tagTypes: ['doctors', 'agents', 'services'],
});
