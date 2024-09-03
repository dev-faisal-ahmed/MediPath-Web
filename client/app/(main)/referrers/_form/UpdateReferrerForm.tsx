'use client';

import * as dialog from '@/components/ui/dialog';
import * as select from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useUpdateReferrer } from './useUpdateReferrer';
import { CustomInput } from '@/components/shared/form/CustomInput';
import { RiEdit2Fill } from 'react-icons/ri';

type TProps = {
  referrerId: string;
  name: string;
  designation?: string;
  type: string;
};

export const UpdateReferrerForm = ({
  referrerId,
  name,
  designation,
  type,
}: TProps) => {
  const { isOpen, setIsOpen, onUpdateReferrer, isLoading } =
    useUpdateReferrer(referrerId);

  return (
    <dialog.Dialog open={isOpen} onOpenChange={setIsOpen}>
      <dialog.DialogTrigger asChild>
        <RiEdit2Fill className='cursor-pointer text-blue-600' size={20} />
      </dialog.DialogTrigger>
      <dialog.DialogContent>
        <dialog.DialogHeader>
          <dialog.DialogTitle>Add Referrer</dialog.DialogTitle>
        </dialog.DialogHeader>
        <form className='flex flex-col gap-3' onSubmit={onUpdateReferrer}>
          <h3 className='mb-2 font-semibold'>Input Referrer Information.</h3>
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
          />

          <div className='flex w-full flex-col gap-2'>
            <Label className='font-semibold'>Type</Label>
            <select.Select defaultValue={type} name='type'>
              <select.SelectTrigger>
                <select.SelectValue placeholder='Select Any' />
              </select.SelectTrigger>
              <select.SelectContent>
                <select.SelectItem value='DOCTOR'>DOCTOR</select.SelectItem>
                <select.SelectItem value='AGENT'>AGENT</select.SelectItem>
              </select.SelectContent>
            </select.Select>
          </div>

          <Button disabled={isLoading} className='mt-3'>
            Add Referrer
          </Button>
        </form>
      </dialog.DialogContent>
    </dialog.Dialog>
  );
};
