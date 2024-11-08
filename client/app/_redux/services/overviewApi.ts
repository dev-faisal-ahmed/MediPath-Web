import { TDailyOverview, TOverview, TServerResponse } from '@/app/_utils/types';
import { baseApi } from './baseApi';

const overview = '/overview';
const overviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get overview
    getOverview: builder.query<TServerResponse<TOverview>, string>({
      query: (type) => `${overview}?type=${type}`,
      providesTags: ['overview'],
    }),

    getDailyOverview: builder.query<TServerResponse<TDailyOverview>, string>({
      query: (date) => `${overview}/daily?date=${date}`,
      providesTags: ['overview'],
    }),
  }),
});

export const { useGetOverviewQuery, useGetDailyOverviewQuery } = overviewApi;
