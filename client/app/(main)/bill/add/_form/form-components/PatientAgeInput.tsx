'use client';

import * as select from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const PatientAgeInput = () => {
  return (
    <div className='flex w-full flex-col gap-2'>
      <Label className='font-semibold'>Patient&apos;s Age</Label>
      <div className='flex items-center rounded-md border border-input'>
        <Input
          className='border-0 focus-visible:ring-0'
          name='age'
          placeholder='Input Age'
          type='number'
          required
        />
        <select.Select name='ageTitle'>
          <select.SelectTrigger className='w-fit rounded-none border-b-0 border-l border-r-0 border-t-0 border-input outline-none focus:ring-0'>
            <select.SelectValue defaultValue={'Year'} placeholder='Age Title' />
          </select.SelectTrigger>
          <select.SelectContent>
            <select.SelectItem value='Year'>Year</select.SelectItem>
            <select.SelectItem value='Month'>Month</select.SelectItem>
            <select.SelectItem value='Day'>Day</select.SelectItem>
            <select.SelectItem value='Hour'>Hour</select.SelectItem>
          </select.SelectContent>
        </select.Select>
      </div>
    </div>
  );
};
