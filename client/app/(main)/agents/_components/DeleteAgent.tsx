'use client';

import * as dialog from '@/components/ui/dialog';
import { useDeleteAgentMutation } from '@/app/_redux/services';
import { Button } from '@/components/ui/button';
import { TbTrashFilled } from 'react-icons/tb';
import { toast } from 'sonner';

type TProps = {
  agentId: string;
};

export const DeleteAgent = ({ agentId }: TProps) => {
  const [deleteAgent, { isLoading }] = useDeleteAgentMutation();

  const onDeleteAgent = async () => {
    const id = toast.loading('Deleting Agent...🔃');
    try {
      const response = await deleteAgent(agentId).unwrap();
      toast.success(response.message, { id });
    } catch (error: any) {
      if (error instanceof Error) toast.error(error.message, { id });
      else toast.error(error.data?.message || 'Something went wrong', { id });
    }
  };

  return (
    <dialog.Dialog>
      <dialog.DialogTrigger asChild>
        <TbTrashFilled className='cursor-pointer text-red-600' size={20} />
      </dialog.DialogTrigger>
      <dialog.DialogContent>
        <dialog.DialogHeader>
          <dialog.DialogTitle>Are you sure?</dialog.DialogTitle>
          <dialog.DialogDescription>
            Once you delete, the agent will be lost forever
          </dialog.DialogDescription>
        </dialog.DialogHeader>
        <div className='flex items-center justify-end gap-4'>
          <dialog.DialogClose asChild>
            <Button variant={'outline'}>Cancel</Button>
          </dialog.DialogClose>
          <Button
            onClick={onDeleteAgent}
            disabled={isLoading}
            variant={'destructive'}
          >
            Proceed
          </Button>
        </div>
      </dialog.DialogContent>
    </dialog.Dialog>
  );
};