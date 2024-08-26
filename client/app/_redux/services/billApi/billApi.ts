import { TServerResponse } from '@/app/_utils/types';
import { baseApi } from '../baseApi';
import { TGenerateBillPayload } from './types';

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
  }),
});

export const { useGenerateBillMutation } = billApi;
