import { model, Schema } from 'mongoose';
import { IAgent } from './interface';

const agentSchema = new Schema<IAgent>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

export const Agent = model<IAgent>('agent', agentSchema);
