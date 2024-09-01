'use client';

import * as dialog from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CustomInput } from '@/components/shared/form/CustomInput';
import { RiEdit2Fill } from 'react-icons/ri';
import { useUpdateAgent } from './useUpdateAgent';

type TProps = {
  agentId: string;
  name: string;
};

export const UpdateAgentForm = ({ agentId, name }: TProps) => {
  const { isOpen, onUpdateAgent, setIsOpen, isLoading } =
    useUpdateAgent(agentId);

  return (
    <dialog.Dialog open={isOpen} onOpenChange={setIsOpen}>
      <dialog.DialogTrigger asChild>
        <RiEdit2Fill className='cursor-pointer text-blue-600' size={20} />
      </dialog.DialogTrigger>
      <dialog.DialogContent>
        <dialog.DialogHeader>
          <dialog.DialogTitle>Update Agent</dialog.DialogTitle>
        </dialog.DialogHeader>
        <form className='flex flex-col gap-3' onSubmit={onUpdateAgent}>
          <h3 className='mb-2 font-semibold'>Input Agent Information.</h3>
          <CustomInput
            label='Name'
            name='name'
            defaultValue={name}
            placeholder='Input name'
            required
          />
          <Button disabled={isLoading} className='mt-3'>
            Update Agent
          </Button>
        </form>
      </dialog.DialogContent>
    </dialog.Dialog>
  );
};
