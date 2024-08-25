import { TAgent, TServerResponse } from '@/app/_utils/types';
import { baseApi } from './baseApi';

const agents = '/agents';
export const agentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get agents
    getAgent: builder.query<TServerResponse<TAgent[]>, null>({
      query: () => `${agents}`,
      providesTags: ['agents'],
    }),
  }),
});

export const { useGetAgentQuery } = agentApi;
