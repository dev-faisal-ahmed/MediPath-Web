'use client';

import { useGetReferrerByIdQuery } from '@/app/_redux/services';
import { Loader } from '@/components/shared/Loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect } from 'react';
import { ReferredTable } from './ReferredTable';
import { TransactionTable } from './TransactionTable';
import { GiveCommission } from '../../../_components/GiveCommission';
import { Button } from '@/components/ui/button';

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

  const due = (commissionDemand || 0) - (totalCommissionPaid || 0);

  return (
    <section>
      <div className='h-52 rounded-t-md bg-gradient-to-br from-green-400 to-green-700' />
      <section className='flex items-end gap-12 rounded-b-md bg-white p-6 shadow'>
        <div className='-mt-20'>
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
        <div className='ml-auto'>
          <GiveCommission
            referrerId={referrerId}
            maxAmount={due}
            trigger={
              <Button
                disabled={due === 0}
                className={`${due === 0 && 'cursor-not-allowed'}`}
              >
                Give Commission
              </Button>
            }
          />
        </div>
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
          <ReferrerSummaryCard label='Due' amount={due} />
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
