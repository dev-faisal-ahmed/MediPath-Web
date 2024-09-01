export type TAgent = {
  _id: string;
  name: string;
};

export type TUpdateAgentPayload = {
  agentId: string;
  data: Omit<TAgent, '_id'>;
};
