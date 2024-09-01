import { baseApi } from './baseApi';
import { TService } from '@/app/_utils/types';
import { TServerResponse } from '@/app/_utils/types';
import { TUpdateServicePayload } from '@/app/_utils/types';

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

    // update service
    updateService: builder.mutation<
      TServerResponse<null>,
      TUpdateServicePayload
    >({
      query: (payload) => ({
        url: `${service}/${payload.serviceId}`,
        method: 'PATCH',
        body: payload.serviceInfo,
      }),
      invalidatesTags: ['services'],
    }),

    // delete service
    deleteService: builder.mutation<TServerResponse<null>, string>({
      query: (serviceId) => ({
        url: `${service}/${serviceId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['services'],
    }),
  }),
});

export const {
  useAddServiceMutation,
  useGetServicesQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceApi;
