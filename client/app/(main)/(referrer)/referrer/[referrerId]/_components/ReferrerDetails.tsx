'use client';

import { useGetReferrerByIdQuery } from '@/app/_redux/services';
import { Loader } from '@/components/shared/Loader';
import { useEffect } from 'react';

type TProps = {
  referrerId: string;
};

export const ReferrerDetails = ({ referrerId }: TProps) => {
  const { data: referrerInfo, isLoading } = useGetReferrerByIdQuery(referrerId);

  useEffect(() => {
    document.title = `Medipath | ${referrerInfo?.data?.name || 'Referrer Details'}`;
  }, [referrerInfo?.data?.name]);

  if (isLoading) return <Loader className='mt-8' />;

  if (!referrerInfo?.data)
    return <p className='mt-8 text-center font-semibold'>No Referrer Found</p>;

  const { name, designation, type } = referrerInfo.data;

  return (
    <section>
      <div className='mx-auto flex size-40 items-center justify-center rounded-full bg-primary text-6xl font-bold text-white'>
        {name[0]}
      </div>
      <section className='mt-6 text-center'>
        <h2 className='text-xl font-semibold'>{name}</h2>
        {designation && (
          <p className='mt-1 text-muted-foreground'>{designation}</p>
        )}
        <p className='mt-1 text-muted-foreground'>{type}</p>
      </section>
    </section>
  );
};
