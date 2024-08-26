import { TPatient, TServerResponse } from '@/app/_utils/types';
import { baseApi } from './baseApi';

const patients = `/patients`;

const patientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get patients
    getPatients: builder.query<TServerResponse<TPatient[]>, null>({
      query: () => `${patients}`,
      providesTags: ['patients'],
    }),
  }),
});

export const { useGetPatientsQuery } = patientApi;
