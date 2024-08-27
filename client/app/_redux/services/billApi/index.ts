export * from './types';

import { TServerResponse } from '@/app/_utils/types';
import { TBillDetails, TGenerateBillPayload } from './types';
import { baseApi } from '../baseApi';

const bill = '/bill';

const billApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // generate bill
    generateBill: builder.mutation<
      TServerResponse<{ billId: string }>,
      TGenerateBillPayload
    >({
      query: (payload) => ({
        url: `${bill}`,
        method: 'POST',
        body: payload,
      }),
    }),

    // get bill details
    getBillDetails: builder.query<TServerResponse<TBillDetails>, string>({
      query: (billId) => `${bill}/${billId}`,
    }),
  }),
});

export const { useGenerateBillMutation, useGetBillDetailsQuery } = billApi;
