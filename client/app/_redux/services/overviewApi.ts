import { TOverview, TServerResponse } from '@/app/_utils/types';
import { baseApi } from './baseApi';

const overview = '/overview';
const overviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get overview
    getOverview: builder.query<TServerResponse<TOverview>, string>({
      query: (type) => `${overview}?type=${type}`,
      providesTags: ['overview'],
    }),
  }),
});

export const { useGetOverviewQuery } = overviewApi;
