'use client';

import { useAppDispatch } from '@/app/_redux/hooks';
import { updateBillId } from '@/app/_redux/slices';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';

export const Search = () => {
  const dispatch = useAppDispatch();
  const [key, setKey] = useState('');

  useEffect(() => {
    const debounced = setTimeout(() => {
      dispatch(updateBillId(key));
    }, 300);

    return () => clearTimeout(debounced);
  }, [key, dispatch]);

  return (
    <div className='relative'>
      <FiSearch className='absolute left-2 top-1/2 -translate-y-1/2 text-xl text-input' />
      <Input
        onChange={(event) => setKey(event.target.value)}
        className='pl-8'
        placeholder='Write billId here...'
      />
    </div>
  );
};
