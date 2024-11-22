'use client';

import * as dialog from '@/components/ui/dialog';

import { useUpdateCommissionMutation } from '@/app/_redux/services';
import { CustomInput } from '@/components/shared/form/CustomInput';
import { TooltipContainer } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { FormEvent, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { toast } from 'sonner';

export function UpdateCommission({ billId }: { billId: string }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [updateCommission, { isLoading }] = useUpdateCommissionMutation();

  const onUpdateCommission = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement & {
      amount: { value: string };
    };

    const amount = form.amount.value;
    if (Number(amount) < 0)
      return toast.error('Amount can not be negative', { duration: 1500 });

    const id = toast.loading('Updating commission');
    try {
      const response = await updateCommission({
        billId,
        amount: Number(amount),
      }).unwrap();

      if (!response?.ok) throw new Error(response?.message);
      toast.success(response?.message, { id });
      setIsDialogOpen(false);
    } catch (error: any) {
      if (error instanceof Error) toast.error(error.message, { id });
      else toast.error(error.data?.message || 'Something went wrong', { id });
    }
  };

  return (
    <dialog.Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <dialog.DialogTrigger>
        <TooltipContainer label='Update Commission'>
          <span className='mx-auto block rounded-md bg-blue-600 p-1 text-white'>
            <MdEdit />
          </span>
        </TooltipContainer>
      </dialog.DialogTrigger>
      <dialog.DialogContent>
        <dialog.DialogHeader>
          <dialog.DialogTitle>Update Commission</dialog.DialogTitle>
          <dialog.DialogDescription>
            Please fill up the form to update commission
          </dialog.DialogDescription>
        </dialog.DialogHeader>
        <form onSubmit={onUpdateCommission}>
          <CustomInput
            label='Amount'
            placeholder='Enter amount'
            name='amount'
            min={0}
            required
          />
          <Button disabled={isLoading} className='ml-auto mt-4 block'>
            Update Commission
          </Button>
        </form>
      </dialog.DialogContent>
    </dialog.Dialog>
  );
}
