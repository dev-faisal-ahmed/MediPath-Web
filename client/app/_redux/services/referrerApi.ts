import {
  TReferrer,
  TReferrerDetails,
  TReferrerInfo,
  TServerResponse,
  TUpdateReferrer,
} from '@/app/_utils/types';
import { baseApi } from './baseApi';

const referrer = '/referrer';
const referrers = '/referrers';

export const referrerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // add referrer
    addReferrer: builder.mutation<
      TServerResponse<null>,
      Omit<TReferrer, '_id'>
    >({
      query: (payload) => ({
        url: `${referrer}`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['referrers'],
    }),

    // get referrers
    getReferrers: builder.query<TServerResponse<TReferrerDetails[]>, null>({
      query: () => `${referrers}`,
      providesTags: ['referrers'],
    }),

    // getReferrerById
    getReferrerById: builder.query<TServerResponse<TReferrerInfo>, string>({
      query: (referrerId) => `${referrer}/${referrerId}`,
      providesTags: ['referrerDetails'],
    }),

    // update referrer
    updateReferrer: builder.mutation<TServerResponse<null>, TUpdateReferrer>({
      query: ({ payload, referrerId }) => ({
        url: `${referrer}/${referrerId}`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['referrerDetails', 'referrers'],
    }),

    // delete referrer
    deleteReferrer: builder.mutation<TServerResponse<null>, string>({
      query: (referrerId) => ({
        url: `${referrer}/${referrerId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['referrerDetails', 'referrers'],
    }),
  }),
});

export const {
  useAddReferrerMutation,
  useGetReferrersQuery,
  useGetReferrerByIdQuery,
  useUpdateReferrerMutation,
  useDeleteReferrerMutation,
} = referrerApi;
