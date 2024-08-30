import {
  TBill,
  TBillDetails,
  TServerResponse,
  TGenerateBillPayload,
  TTakeDuePayload,
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
      invalidatesTags: ['bills'],
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
        url: `${bill}/${payload.billId}`,
        method: 'PATCH',
        body: { price: payload.price },
      }),
      invalidatesTags: ['billDetails', 'bills'],
    }),
  }),
});

export const {
  useGenerateBillMutation,
  useGetBillsQuery,
  useGetBillDetailsQuery,
  useTakeDueMutation,
} = billApi;
