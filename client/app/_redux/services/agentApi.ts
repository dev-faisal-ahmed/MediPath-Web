import {
  TAgent,
  TServerResponse,
  TUpdateAgentPayload,
} from '@/app/_utils/types';
import { baseApi } from './baseApi';

const agent = '/agent';
const agents = '/agents';
const agentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // add agent
    addAgent: builder.mutation<TServerResponse<null>, Omit<TAgent, '_id'>>({
      query: (payload) => ({
        url: `${agent}`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['agents'],
    }),

    // get agents
    getAgent: builder.query<TServerResponse<TAgent[]>, null>({
      query: () => `${agents}`,
      providesTags: ['agents'],
    }),

    // update agent
    updateAgent: builder.mutation<TServerResponse<null>, TUpdateAgentPayload>({
      query: (payload) => ({
        url: `${agent}/${payload.agentId}`,
        method: 'PATCH',
        body: payload.data,
      }),
    }),
    // delete agent
    deleteAgent: builder.mutation<TServerResponse<null>, string>({
      query: (agentId) => ({
        url: `${agent}/${agentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['agents'],
    }),
  }),
});

export const {
  useAddAgentMutation,
  useGetAgentQuery,
  useUpdateAgentMutation,
  useDeleteAgentMutation,
} = agentApi;
