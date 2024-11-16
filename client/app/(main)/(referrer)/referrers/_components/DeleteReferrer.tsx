'use client';

import * as dialog from '@/components/ui/dialog';
import { toast } from 'sonner';
import { useState } from 'react';
import { TbTrashFilled } from 'react-icons/tb';
import { Button } from '@/components/ui/button';
import { useDeleteReferrerMutation } from '@/app/_redux/services';
import { TooltipContainer } from '@/components/ui/tooltip';

type TProps = {
  referrerId: string;
};

export const DeleteReferrer = ({ referrerId }: TProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [DeleteReferrer, { isLoading }] = useDeleteReferrerMutation();

  const onDeleteDoctor = async () => {
    const id = toast.loading('Deleting doctor...🔃');
    try {
      const response = await DeleteReferrer(referrerId).unwrap();
      toast.success(response.message, { id });
      setIsOpen(false);
    } catch (error: any) {
      toast.error(error.data?.message || 'Something went wrong', { id });
    }
  };

  return (
    <dialog.Dialog open={isOpen} onOpenChange={setIsOpen}>
      <dialog.DialogTrigger asChild>
        <TooltipContainer label='Delete Referrer'>
          <TbTrashFilled className='cursor-pointer text-red-600' size={20} />
        </TooltipContainer>
      </dialog.DialogTrigger>
      <dialog.DialogContent>
        <dialog.DialogHeader>
          <dialog.DialogTitle>Are you sure?</dialog.DialogTitle>
          <dialog.DialogDescription>
            Once you delete, the referrer will be lost forever
          </dialog.DialogDescription>
        </dialog.DialogHeader>
        <div className='flex items-center justify-end gap-4'>
          <dialog.DialogClose asChild>
            <Button variant={'outline'}>Cancel</Button>
          </dialog.DialogClose>
          <Button
            onClick={onDeleteDoctor}
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
