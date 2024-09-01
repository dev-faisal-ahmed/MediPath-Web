'use client';

import * as dialog from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CustomInput } from '@/components/shared/form/CustomInput';
import { useUpdateDoctor } from './useUpdateDoctor';
import { RiEdit2Fill } from 'react-icons/ri';

type TProps = {
  doctorId: string;
  name: string;
  designation: string;
};

export const UpdateDoctorForm = ({ name, designation, doctorId }: TProps) => {
  const { isOpen, onUpdateDoctor, setIsOpen, isLoading } =
    useUpdateDoctor(doctorId);

  return (
    <dialog.Dialog open={isOpen} onOpenChange={setIsOpen}>
      <dialog.DialogTrigger asChild>
        <RiEdit2Fill className='cursor-pointer text-blue-600' size={20} />
      </dialog.DialogTrigger>
      <dialog.DialogContent>
        <dialog.DialogHeader>
          <dialog.DialogTitle>Add Doctor</dialog.DialogTitle>
        </dialog.DialogHeader>
        <form className='flex flex-col gap-3' onSubmit={onUpdateDoctor}>
          <h3 className='mb-2 font-semibold'>Input Doctor Information.</h3>
          <CustomInput
            label='Name'
            name='name'
            defaultValue={name}
            placeholder='Input name'
            required
          />
          <CustomInput
            label='Designation'
            name='designation'
            defaultValue={designation}
            placeholder='Input Designation'
            required
          />
          <Button disabled={isLoading} className='mt-3'>
            Update Doctor
          </Button>
        </form>
      </dialog.DialogContent>
    </dialog.Dialog>
  );
};
