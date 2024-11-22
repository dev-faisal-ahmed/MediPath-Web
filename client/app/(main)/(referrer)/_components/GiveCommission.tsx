'use client';

import * as dialog from '@/components/ui/dialog';

import { toast } from 'sonner';
import { FormEvent, ReactNode, useState } from 'react';
import { Button } from '@/components/ui/button';
import { postRequestHelper } from '@/app/_helpers/apiHelper';
import { useGiveCommissionMutation } from '@/app/_redux/services';
import { CustomInput } from '@/components/shared/form/CustomInput';
import { CustomTextarea } from '@/components/shared/form/CustomTextArea';

type TProps = {
  referrerId: string;
  maxAmount: number;
  trigger: ReactNode;
  asChild?: boolean;
};

export const GiveCommission = ({ referrerId, maxAmount, trigger }: TProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [giveCommission, { isLoading }] = useGiveCommissionMutation();

  const onGiveCommission = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement & {
      amount: { value: string };
      description: { value: string };
    };

    const amount = form.amount.value;
    const description = form.description.value;

    const id = toast.loading('Giving commission');
    postRequestHelper(async () => {
      const response = await giveCommission({
        amount: Number(amount),
        referrerId,
        description,
      }).unwrap();

      toast.success(response.message, { id });
      setIsOpen(false);
    }, id);
  };

  return (
    <dialog.Dialog open={isOpen} onOpenChange={setIsOpen}>
      <dialog.DialogTrigger asChild>{trigger}</dialog.DialogTrigger>
      <dialog.DialogContent>
        <dialog.DialogHeader>
          <dialog.DialogTitle>Pay Commission</dialog.DialogTitle>
          <dialog.DialogDescription>
            Input Commission information
          </dialog.DialogDescription>
        </dialog.DialogHeader>
        <form onSubmit={onGiveCommission}>
          <CustomInput
            label='Amount'
            placeholder='Input amount'
            name='amount'
            type='number'
            min={0}
            max={maxAmount}
          />

          <CustomTextarea
            containerClass='mt-3'
            label='Description'
            placeholder='Input description'
            name='description'
          />
          <div className='mt-4 flex items-center justify-end gap-3'>
            <dialog.DialogClose asChild>
              <Button variant={'destructive'}>Cancel</Button>
            </dialog.DialogClose>
            <Button disabled={isLoading}>Proceed</Button>
          </div>
        </form>
      </dialog.DialogContent>
    </dialog.Dialog>
  );
};
