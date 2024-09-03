import * as select from '@/components/ui/select';
import { useState } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { TReferrer } from '@/app/_utils/types';
import { Label } from '@/components/ui/label';

type TProps = {
  referrer: TReferrer | undefined;
  referrerList: TReferrer[];
  onReferrerSelection: (referrer: TReferrer | undefined) => void;
};

export const SelectReferrer = ({
  referrer,
  referrerList,
  onReferrerSelection,
}: TProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onSelect = (payload: TReferrer) => {
    if (payload._id === referrer?._id) {
      onReferrerSelection(undefined);
      return setIsOpen(false);
    }

    onReferrerSelection(payload);
    setIsOpen(false);
  };

  return (
    <div className='mt-3 flex w-full flex-col gap-2'>
      <Label className='font-semibold'>Referred By</Label>
      <select.Select open={isOpen} onOpenChange={setIsOpen}>
        <select.SelectTrigger>
          {referrer ? (
            <p className=''>{referrer.name}</p>
          ) : (
            <p>Select referrer</p>
          )}
        </select.SelectTrigger>
        <select.SelectContent className='p-3'>
          <div className='flex flex-col gap-2'>
            {referrerList.map(({ _id, name, type, designation }) => (
              <div
                onClick={() => onSelect({ _id, name, type, designation })}
                className='relative flex w-full cursor-pointer justify-between gap-4 px-2 duration-300 hover:bg-primary-50'
                key={_id}
              >
                <div className='pl-4'>
                  <p className='font-semibold'>{name}</p>
                  {designation && (
                    <p className='text-sm text-neutral-500'>{designation}</p>
                  )}
                </div>

                <div className='absolute left-0 top-1/2 -translate-y-1/2'>
                  {_id === referrer?._id && <FaCheck />}
                </div>
                <p>{type}</p>
              </div>
            ))}
          </div>
        </select.SelectContent>
      </select.Select>
    </div>
  );
};
