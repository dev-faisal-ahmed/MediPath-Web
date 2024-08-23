'use client';

import * as select from '@/components/ui/select';
import { TDoctor } from '@/app/_utils/types';
import { Label } from '@/components/ui/label';

type TProps = {
  doctors: TDoctor[];
};

export const SelectDoctor = ({ doctors }: TProps) => {
  return (
    <div className='relative flex flex-col gap-2'>
      <Label className='font-semibold'>Doctor</Label>
      <select.Select name='doctor'>
        <select.SelectTrigger>
          <select.SelectValue
            style={{ width: 140 }}
            placeholder='Select Doctor'
          />
        </select.SelectTrigger>
        <select.SelectContent style={{ maxHeight: 270 }}>
          {doctors.map((doctor) => (
            <select.SelectItem key={doctor._id} value={doctor._id}>
              <span className='font-semibold'>{doctor.name}</span>
            </select.SelectItem>
          ))}
        </select.SelectContent>
      </select.Select>
    </div>
  );
};
