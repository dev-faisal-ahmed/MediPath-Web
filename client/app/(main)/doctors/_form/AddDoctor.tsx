'use client';

import * as dialog from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAddDoctor } from './useAddDoctor';
import { CustomInput } from '@/components/shared/form/CustomInput';

export const AddDoctor = () => {
  const { isOpen, onAddDoctor, setIsOpen, isLoading } = useAddDoctor();

  return (
    <dialog.Dialog open={isOpen} onOpenChange={setIsOpen}>
      <dialog.DialogTrigger asChild>
        <Button className='ml-auto block'>Add Doctor</Button>
      </dialog.DialogTrigger>
      <dialog.DialogContent>
        <dialog.DialogHeader>
          <dialog.DialogTitle>Add Doctor</dialog.DialogTitle>
        </dialog.DialogHeader>
        <form className='flex flex-col gap-3' onSubmit={onAddDoctor}>
          <h3 className='mb-2 font-semibold'>Input Doctor Information.</h3>
          <CustomInput
            label='Name'
            name='name'
            placeholder='Input name'
            required
          />
          <CustomInput
            label='Phone'
            name='phone'
            type='number'
            placeholder='Input Phone'
            required
          />
          <Button disabled={isLoading} className='mt-3'>
            Add Doctor
          </Button>
        </form>
      </dialog.DialogContent>
    </dialog.Dialog>
  );
};
