'use client';

import * as dialog from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CustomInput } from '@/components/shared/form/CustomInput';
import { RiEdit2Fill } from 'react-icons/ri';
import { useUpdateService } from './useUpdateService';

type TProps = {
  billId: string;
  name: string;
  price: number;
  roomNo: string;
};

export const UpdateServiceForm = ({ billId, name, price, roomNo }: TProps) => {
  const { isOpen, setIsOpen, isLoading, onUpdateService } =
    useUpdateService(billId);

  return (
    <dialog.Dialog open={isOpen} onOpenChange={setIsOpen}>
      <dialog.DialogTrigger asChild>
        <RiEdit2Fill className='cursor-pointer text-blue-600' size={20} />
      </dialog.DialogTrigger>
      <dialog.DialogContent>
        <dialog.DialogHeader>
          <dialog.DialogTitle>Update Service</dialog.DialogTitle>
        </dialog.DialogHeader>
        <form className='flex flex-col gap-3' onSubmit={onUpdateService}>
          <h3 className='mb-2 font-semibold'>Input Service Information.</h3>
          <CustomInput
            label='Name'
            name='name'
            placeholder='Input name'
            defaultValue={name}
            required
          />

          <CustomInput
            label='Price'
            name='price'
            type='number'
            placeholder='Input Price'
            defaultValue={price}
            min={0}
            required
          />

          <CustomInput
            label='Room No'
            name='roomNo'
            type='number'
            placeholder='Input RoomNo'
            defaultValue={roomNo}
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
