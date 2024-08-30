'use client';

import * as dialog from '@/components/ui/dialog';
import { useAddService } from './useAddService';
import { Button } from '@/components/ui/button';
import { CustomInput } from '@/components/shared/form/CustomInput';

export const AddServiceForm = () => {
  const { isOpen, setIsOpen, isLoading, onAddServices } = useAddService();
  return (
    <dialog.Dialog open={isOpen} onOpenChange={setIsOpen}>
      <dialog.DialogTrigger asChild>
        <Button className='ml-auto block'>Add Service</Button>
      </dialog.DialogTrigger>
      <dialog.DialogContent>
        <dialog.DialogHeader>
          <dialog.DialogTitle>Add Doctor</dialog.DialogTitle>
        </dialog.DialogHeader>
        <form className='flex flex-col gap-3' onSubmit={onAddServices}>
          <h3 className='mb-2 font-semibold'>Input Doctor Information.</h3>
          <CustomInput
            label='Name'
            name='name'
            placeholder='Input name'
            required
          />

          <CustomInput
            label='Price'
            name='price'
            type='number'
            placeholder='Input Price'
            min={0}
            required
          />

          <CustomInput
            label='Room No'
            name='roomNo'
            type='number'
            placeholder='Input RoomNo'
            min={0}
            required
          />

          <Button disabled={isLoading} className='mt-3'>
            Add Service
          </Button>
        </form>
      </dialog.DialogContent>
    </dialog.Dialog>
  );
};
