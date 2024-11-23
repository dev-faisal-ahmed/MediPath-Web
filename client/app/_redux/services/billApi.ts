import {
  TBill,
  TBillDetails,
  TServerResponse,
  TGenerateBillPayload,
  TTakeDuePayload,
  TUpdateCommissionPayload,
} from '@/app/_utils/types';

import { baseApi } from './baseApi';
import { makeUrl } from '@/app/_helpers';

const bill = '/bill';
const bills = '/bills';

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

      invalidatesTags: [
        'bills',
        'overview-daily',
        'overview-dashboard',
        'overview-monthly',
      ],
    }),

    // get all bills
    getBills: builder.query<TServerResponse<TBill[]>, Record<string, any>>({
      query: (args) => `${bills}/${makeUrl(args)}`,
      providesTags: ['bills'],
    }),

    // get bill details
    getBillDetails: builder.query<TServerResponse<TBillDetails>, string>({
      query: (billId) => `${bill}/${billId}`,
      providesTags: ['billDetails'],
    }),

    // take due
    takeDue: builder.mutation<TServerResponse<null>, TTakeDuePayload>({
      query: (payload) => ({
        url: `${bill}/${payload.billId}/take-due`,
        method: 'PATCH',
        body: { price: payload.price },
      }),
      invalidatesTags: [
        'billDetails',
        'bills',
        'overview-daily',
        'overview-dashboard',
        'overview-monthly',
      ],
    }),

    // update commission
    updateCommission: builder.mutation<
      TServerResponse<null>,
      TUpdateCommissionPayload
    >({
      query: ({ amount, billId }) => ({
        url: `${bill}/${billId}/commission`,
        method: 'PATCH',
        body: { amount },
      }),
      invalidatesTags: ['billDetails', 'bills', 'referrerDetails'],
    }),
  }),
});

export const {
  useGenerateBillMutation,
  useGetBillsQuery,
  useGetBillDetailsQuery,
  useTakeDueMutation,
  useUpdateCommissionMutation,
} = billApi;
