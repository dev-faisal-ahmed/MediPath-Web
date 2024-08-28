import { TDoctor, TServerResponse } from '@/app/_utils/types';
import { baseApi } from './baseApi';

const doctor = '/doctor';
const doctors = '/doctors';

const doctorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // add doctor
    addDoctor: builder.mutation<TServerResponse<null>, Omit<TDoctor, '_id'>>({
      query: (payload) => ({
        url: `${doctor}`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['doctors'],
    }),

    // get doctors
    getDoctors: builder.query<TServerResponse<TDoctor[]>, null>({
      query: () => `${doctors}`,
      providesTags: ['doctors'],
    }),
  }),
});

export const { useAddDoctorMutation, useGetDoctorsQuery } = doctorApi;
