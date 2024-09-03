'use client';

import * as dialog from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useTakeDue } from './useTakeDue';
import { CustomInput } from '@/components/shared/form/CustomInput';

type TProps = {
  due: number;
  billId: string;
};

export const TakeDueForm = ({ due, billId }: TProps) => {
  const { onTakeDue, isLoading } = useTakeDue(billId);

  return (
    <dialog.Dialog>
      <dialog.DialogTrigger asChild>
        <Button disabled={due === 0} className='block'>
          {due ? 'Take Due' : 'Already Paid'}
        </Button>
      </dialog.DialogTrigger>
      <dialog.DialogContent>
        <dialog.DialogHeader>
          <dialog.DialogTitle>Take Due</dialog.DialogTitle>
        </dialog.DialogHeader>
        <form onSubmit={onTakeDue}>
          <CustomInput
            label='Price'
            placeholder='Input Price'
            name='price'
            min={0}
            type='number'
            required
          />
          <Button className='ml-auto mt-6 block' disabled={isLoading}>
            Take Due
          </Button>
        </form>
      </dialog.DialogContent>
    </dialog.Dialog>
  );
};
