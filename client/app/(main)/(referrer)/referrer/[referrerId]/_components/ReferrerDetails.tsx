'use client';

import { useGetReferrerByIdQuery } from '@/app/_redux/services';
import { Loader } from '@/components/shared/Loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect } from 'react';
import { ReferredTable } from './ReferredTable';
import { TransactionTable } from './TransactionTable';

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

  const {
    name,
    designation,
    type,
    commissionDemand,
    totalCommissionPaid,
    referred,
    transactions,
    visited,
  } = referrerInfo.data;

  return (
    <section>
      <div className='h-52 rounded-md bg-gradient-to-br from-green-400 to-green-700' />
      <section className='flex items-end gap-12'>
        <div className='-mt-16 ml-6'>
          <div className='flex size-40 items-center justify-center rounded-full bg-primary text-6xl font-bold text-white'>
            {name[0]}
          </div>
        </div>
        <section className=''>
          <h2 className='text-xl font-semibold'>{name}</h2>
          {designation && (
            <p className='mt-1 text-muted-foreground'>{designation}</p>
          )}
          <p className='mt-1 text-muted-foreground'>{type}</p>
        </section>
      </section>

      <section className='mt-12 flex gap-6'>
        <section className='grid flex-1 grid-cols-3 gap-6'>
          <ReferrerSummaryCard
            label='Total Commission'
            amount={commissionDemand || 0}
          />
          <ReferrerSummaryCard
            label='Total Commission Paid'
            amount={totalCommissionPaid || 0}
          />
          <ReferrerSummaryCard
            label='Due'
            amount={(commissionDemand || 0) - (totalCommissionPaid || 0)}
          />
        </section>
      </section>

      <section className='mt-4 flex gap-6'>
        <ReferredTable
          bills={type === 'AGENT' ? referred || [] : visited || []}
          title={type === 'AGENT' ? 'Referred' : 'Visited'}
        />
        <TransactionTable transactions={transactions || []} />
      </section>
    </section>
  );
};

type TReferrerSummaryCard = {
  label: string;
  amount: number;
};

function ReferrerSummaryCard({ label, amount }: TReferrerSummaryCard) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-lg'>{label}</CardTitle>
      </CardHeader>
      <CardContent className='mt-auto'>
        <p className='text-4xl font-semibold'>৳ {amount}</p>
      </CardContent>
    </Card>
  );
}
