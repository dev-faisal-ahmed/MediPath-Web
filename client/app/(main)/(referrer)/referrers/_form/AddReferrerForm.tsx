'use client';

import * as dialog from '@/components/ui/dialog';
import * as select from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useAddReferrer } from './useAddReferrer';
import { CustomInput } from '@/components/shared/form/CustomInput';
import { Label } from '@/components/ui/label';

export const AddReferrerForm = () => {
  const { isOpen, setIsOpen, onAddReferrer, isLoading } = useAddReferrer();

  return (
    <dialog.Dialog open={isOpen} onOpenChange={setIsOpen}>
      <dialog.DialogTrigger asChild>
        <Button className='ml-auto block'>Add Referrer</Button>
      </dialog.DialogTrigger>
      <dialog.DialogContent>
        <dialog.DialogHeader>
          <dialog.DialogTitle>Add Referrer</dialog.DialogTitle>
        </dialog.DialogHeader>
        <form className='flex flex-col gap-3' onSubmit={onAddReferrer}>
          <h3 className='mb-2 font-semibold'>Input Referrer Information.</h3>
          <CustomInput
            label='Name'
            name='name'
            placeholder='Input name'
            required
          />
          <CustomInput
            label='Designation'
            name='designation'
            placeholder='Input Designation'
          />

          <div className='flex w-full flex-col gap-2'>
            <Label className='font-semibold'>Type</Label>
            <select.Select name='type'>
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
