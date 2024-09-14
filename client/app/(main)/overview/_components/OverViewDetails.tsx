'use client';

import { DatePicker } from '@/components/shared/form/DatePicker';
import { BillTable } from '@/components/shared/BillTable';
import { useOverviewDetails } from './useOverviewDetails';
import { Loader } from '@/components/shared/Loader';
import { OverviewCard } from './OverviewCard';
import { format } from 'date-fns';

export const OverviewDetails = () => {
  const { date, onDateChange, isLoading, isFetching, overviewData } =
    useOverviewDetails();

  if (isLoading || isFetching) return <Loader className='mt-8' />;

  return (
    <section>
      {overviewData ? (
        <>
          <div className='flex items-center justify-between'>
            <h1 className='text-lg font-semibold'>
              Date : {format(date, 'PPP')}
            </h1>
            <DatePicker date={date || new Date()} onDateSelect={onDateChange} />
          </div>
          <div className='mb-2 mt-6 grid gap-4 md:grid-cols-3 xl:grid-cols-5'>
            <OverviewCard label='Balance' value={overviewData.balance} />
            <OverviewCard label='Revenue' value={overviewData.revenue} />
            <OverviewCard label='Collection' value={overviewData.collection} />
            <OverviewCard label='Due' value={overviewData.due} />
            <OverviewCard
              label='Commission Paid'
              value={overviewData.commission}
            />
            <OverviewCard
              label='Commission To Be Paid'
              value={overviewData.commissionToBePaid}
            />
            <OverviewCard
              label='Utility Expense'
              value={overviewData.utilityExpense}
            />
          </div>
          {overviewData.bills && (
            <BillTable label='All Bills' bills={overviewData.bills} />
          )}
        </>
      ) : (
        <p className='mt-6 text-center font-semibold'>No Details Found</p>
      )}
    </section>
  );
};
