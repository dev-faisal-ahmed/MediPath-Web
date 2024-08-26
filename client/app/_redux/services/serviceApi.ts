import { baseApi } from './baseApi';
import { TServerResponse, TService } from '@/app/_utils/types';

const services = '/services';

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get services
    getServices: builder.query<TServerResponse<TService[]>, null>({
      query: () => `${services}`,
      providesTags: ['agents'],
    }),
  }),
});

export const { useGetServicesQuery } = serviceApi;
