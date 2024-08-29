import { baseApi } from './baseApi';
import { TServerResponse, TService } from '@/app/_utils/types';

const services = '/services';
const service = '/service';

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // add service
    addService: builder.mutation<TServerResponse<null>, Omit<TService, '_id'>>({
      query: (payload) => ({
        url: `${service}`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['services'],
    }),

    // get services
    getServices: builder.query<TServerResponse<TService[]>, null>({
      query: () => `${services}`,
      providesTags: ['services'],
    }),
  }),
});

export const { useAddServiceMutation, useGetServicesQuery } = serviceApi;
