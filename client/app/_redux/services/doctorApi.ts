import {
  TDoctor,
  TServerResponse,
  TUpdateDoctorPayload,
} from '@/app/_utils/types';
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

    // update doctor
    updateDoctor: builder.mutation<TServerResponse<null>, TUpdateDoctorPayload>(
      {
        query: (payload) => ({
          url: `${doctor}/${payload.doctorId}`,
          method: 'PATCH',
          body: payload.data,
        }),
        invalidatesTags: ['doctors'],
      },
    ),
  }),
});

export const {
  useAddDoctorMutation,
  useGetDoctorsQuery,
  useUpdateDoctorMutation,
} = doctorApi;
