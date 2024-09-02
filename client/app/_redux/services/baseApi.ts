import { serverAddress } from '@/app/_data';
import { getAccessTokenAction } from '@/app/_actions';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
  tagTypes: [
    'referrers',
    'referrerDetails',
    'services',
    'patients',
    'bills',
    'billDetails',
    'overview',
  ],
});
