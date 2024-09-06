'use client';

import * as dialog from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { useAddExpense } from './useAddExpense';
import { DatePicker } from '@/components/shared/form/DatePicker';
import { CustomInput } from '@/components/shared/form/CustomInput';
import { CustomTextarea } from '@/components/shared/form/CustomTextArea';

export const AddExpense = () => {
  const { states, handlers } = useAddExpense();
  const { date, isOpen, isLoading } = states;
  const { onDateChange, onAddExpense, setIsOpen } = handlers;

  return (
    <dialog.Dialog open={isOpen} onOpenChange={setIsOpen}>
      <dialog.DialogTrigger asChild>
        <Button>Add Expense</Button>
      </dialog.DialogTrigger>
      <dialog.DialogContent>
        <dialog.DialogHeader>
          <dialog.DialogTitle>Add Expense</dialog.DialogTitle>
          <dialog.DialogDescription>
            Input Expense Details
          </dialog.DialogDescription>
        </dialog.DialogHeader>
        <form onSubmit={onAddExpense} className='flex flex-col gap-3'>
          <DatePicker label='Date' date={date} onDateSelect={onDateChange} />
          <CustomInput
            label='Amount'
            placeholder='Input amount'
            name='amount'
            required
            min={0}
            type='number'
          />
          <CustomTextarea
            label='Details'
            name='description'
            placeholder='Write details'
          />
          <Button disabled={isLoading} className='mt-3'>
            Add Expense
          </Button>
        </form>
      </dialog.DialogContent>
    </dialog.Dialog>
  );
};
