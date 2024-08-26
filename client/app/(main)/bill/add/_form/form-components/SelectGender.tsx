'use client';

import { Label } from '@/components/ui/label';
import * as select from '@/components/ui/select';

type TProps = {
  defaultValue?: string;
};

export const SelectGender = ({ defaultValue }: TProps) => {
  return (
    <div className='flex w-full flex-col gap-2'>
      <Label className='font-semibold'>Gender</Label>
      <select.Select name='gender'>
        <select.SelectTrigger>
          <select.SelectValue
            defaultValue={defaultValue}
            placeholder='Select Gender'
          />
        </select.SelectTrigger>
        <select.SelectContent>
          <select.SelectItem value='Male'>Male</select.SelectItem>
          <select.SelectItem value='Female'>Female</select.SelectItem>
          <select.SelectItem value='Others'>Others</select.SelectItem>
        </select.SelectContent>
      </select.Select>
    </div>
  );
};
