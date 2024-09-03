import { TGiveCommissionPayload, TServerResponse } from '@/app/_utils/types';
import { baseApi } from './baseApi';

const transaction = '/transaction';

const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // give commission
    giveCommission: builder.mutation<
      TServerResponse<null>,
      TGiveCommissionPayload
    >({
      query: (payload) => ({
        url: `${transaction}`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['referrers'],
    }),
  }),
});

export const { useGiveCommissionMutation } = transactionApi;
