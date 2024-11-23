import { TDailyOverview, TOverview, TServerResponse } from '@/app/_utils/types';
import { baseApi } from './baseApi';

const overview = '/overview';
const overviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get overview
    getOverview: builder.query<TServerResponse<TOverview>, string>({
      query: (type) => `${overview}?type=${type}`,
      providesTags: ['overview-dashboard'],
    }),

    getDailyOverview: builder.query<TServerResponse<TDailyOverview>, string>({
      query: (date) => `${overview}/daily?date=${date}`,
      providesTags: ['overview-daily'],
    }),

    getMonthlyOverview: builder.query<
      TServerResponse<TDailyOverview>,
      { year: string; month: string }
    >({
      query: ({ year, month }) =>
        `${overview}/monthly?year=${year}&month=${month}`,
      providesTags: ['overview-monthly'],
    }),
  }),
});

export const {
  useGetOverviewQuery,
  useGetDailyOverviewQuery,
  useGetMonthlyOverviewQuery,
} = overviewApi;
