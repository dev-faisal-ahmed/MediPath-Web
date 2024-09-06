import {
  TAddExpensePayload,
  TGiveCommissionPayload,
  TServerResponse,
  TTransaction,
} from '@/app/_utils/types';
import { baseApi } from './baseApi';

const transaction = '/transaction';
const transactions = '/transactions';

const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // give commission
    giveCommission: builder.mutation<
      TServerResponse<null>,
      TGiveCommissionPayload
    >({
      query: (payload) => ({
        url: `${transaction}/commission`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['referrers', 'overview'],
    }),

    // add expense
    addExpense: builder.mutation<TServerResponse<null>, TAddExpensePayload>({
      query: (payload) => ({
        url: `${transaction}/expense`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['expenses', 'overview'],
    }),

    // get expenses
    getExpense: builder.query<TServerResponse<TTransaction[]>, null>({
      query: () => `${transactions}`,
      providesTags: ['expenses'],
    }),
  }),
});

export const {
  useGiveCommissionMutation,
  useAddExpenseMutation,
  useGetExpenseQuery,
} = transactionApi;
