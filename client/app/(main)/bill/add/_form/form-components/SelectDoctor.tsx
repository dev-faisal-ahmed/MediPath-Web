import * as select from '@/components/ui/select';

import { useState } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { Label } from '@/components/ui/label';
import { TReferrer } from '@/app/_utils/types';

type TProps = {
  doctor: TReferrer | undefined;
  doctorList: TReferrer[];
  onDoctorSelection: (referrer: TReferrer | undefined) => void;
};

export const SelectDoctor = ({
  doctor,
  doctorList,
  onDoctorSelection,
}: TProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onSelect = (payload: TReferrer) => {
    if (payload._id === doctor?._id) {
      onDoctorSelection(undefined);
      return setIsOpen(false);
    }

    onDoctorSelection(payload);
    setIsOpen(false);
  };

  return (
    <div className='mt-3 flex w-full flex-col gap-2'>
      <Label className='font-semibold'>Visited By</Label>
      <select.Select open={isOpen} onOpenChange={setIsOpen}>
        <select.SelectTrigger>
          {doctor ? (
            <p className=''>{doctor.name}</p>
          ) : (
            <p>Select Any Doctor</p>
          )}
        </select.SelectTrigger>
        <select.SelectContent className='p-3'>
          <div className='flex flex-col gap-2'>
            {doctorList.map(({ _id, name, designation, type }) => (
              <div
                onClick={() => onSelect({ _id, name, designation, type })}
                className='relative flex w-full cursor-pointer justify-between gap-4 px-2 duration-300 hover:bg-primary-50'
                key={_id}
              >
                <div className='pl-4'>
                  <p className='font-semibold'>{name}</p>
                  {designation && (
                    <p className='text-sm text-neutral-500'>{designation}</p>
                  )}
                </div>

                <div className='absolute right-0 top-1/2 -translate-y-1/2'>
                  {_id === doctor?._id && <FaCheck />}
                </div>
              </div>
            ))}
          </div>
        </select.SelectContent>
      </select.Select>
    </div>
  );
};
