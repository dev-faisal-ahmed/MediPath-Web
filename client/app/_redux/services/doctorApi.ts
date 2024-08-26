import { TDoctor, TServerResponse } from '@/app/_utils/types';
import { baseApi } from './baseApi';

const doctors = '/doctors';

const doctorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get doctors
    getDoctors: builder.query<TServerResponse<TDoctor[]>, null>({
      query: () => `${doctors}`,
    }),
  }),
});

export const { useGetDoctorsQuery } = doctorApi;
