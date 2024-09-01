'use client';

import * as dialog from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CustomInput } from '@/components/shared/form/CustomInput';
import { useAddAgent } from './useAddAgent';

export const AddAgentForm = () => {
  const { isOpen, onAddAgent, setIsOpen, isLoading } = useAddAgent();

  return (
    <dialog.Dialog open={isOpen} onOpenChange={setIsOpen}>
      <dialog.DialogTrigger asChild>
        <Button className='ml-auto block'>Add Agent</Button>
      </dialog.DialogTrigger>
      <dialog.DialogContent>
        <dialog.DialogHeader>
          <dialog.DialogTitle>Add Agent</dialog.DialogTitle>
        </dialog.DialogHeader>
        <form className='flex flex-col gap-3' onSubmit={onAddAgent}>
          <h3 className='mb-2 font-semibold'>Input Agent Information.</h3>
          <CustomInput
            label='Name'
            name='name'
            placeholder='Input name'
            required
          />
          <Button disabled={isLoading} className='mt-3'>
            Add Agent
          </Button>
        </form>
      </dialog.DialogContent>
    </dialog.Dialog>
  );
};
