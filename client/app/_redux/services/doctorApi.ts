import { baseApi } from './baseApi';

const doctors = 'doctors';
export const doctorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get doctors
    getDoctors: builder.query<any, undefined>({
      query: () => `${doctors}`,
      providesTags: ['doctors'],
    }),
  }),
});

export const { useGetDoctorsQuery } = doctorApi;
