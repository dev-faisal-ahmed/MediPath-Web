'use client';

import * as select from '@/components/ui/select';
import { TAgent } from '@/app/_utils/types';
import { Label } from '@/components/ui/label';

type TProps = {
  agents: TAgent[] | undefined;
};

export const SelectAgent = ({ agents }: TProps) => {
  return (
    <div className='relative flex w-full flex-col gap-2'>
      <Label className='font-semibold'>Agents</Label>
      <select.Select name='agent'>
        <select.SelectTrigger>
          <select.SelectValue
            style={{ width: 140 }}
            placeholder='Select Agent'
          />
        </select.SelectTrigger>
        <select.SelectContent style={{ maxHeight: 270 }}>
          {agents && agents.length ? (
            <>
              {agents.map((agent) => (
                <select.SelectItem key={agent._id} value={agent._id}>
                  <span className='font-semibold'>{agent.name}</span>
                </select.SelectItem>
              ))}
            </>
          ) : (
            <p className='p-1 text-muted-foreground'>No Agent Found</p>
          )}
        </select.SelectContent>
      </select.Select>
    </div>
  );
};
