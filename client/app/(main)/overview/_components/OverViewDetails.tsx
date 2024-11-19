'use client';

import { DatePicker } from '@/components/shared/form/DatePicker';
import { useOverviewDetails } from './useOverviewDetails';
import { Loader } from '@/components/shared/Loader';
import { OverviewCard } from './OverviewCard';
import { BillTable } from './BillTable';
import { format } from 'date-fns';

export const OverviewDetails = () => {
  const { date, onDateChange, isLoading, isFetching, overviewData } =
    useOverviewDetails();

  if (isLoading || isFetching) return <Loader className='mt-8' />;

  return (
    <section>
      <div className='flex items-center justify-between'>
        <h1 className='text-lg font-semibold'>Date : {format(date, 'PPP')}</h1>
        <DatePicker date={date || new Date()} onDateSelect={onDateChange} />
      </div>
      <div className='mb-2 mt-6 grid gap-4 md:grid-cols-3 xl:grid-cols-5'>
        <OverviewCard label='Balance' value={overviewData?.balance || 0} />
        <OverviewCard label='Revenue' value={overviewData?.revenue || 0} />
        <OverviewCard
          label='Collection'
          value={overviewData?.collection || 0}
        />
        <OverviewCard label='Due' value={overviewData?.due || 0} />
        <OverviewCard
          label='Commission Paid'
          value={overviewData?.commission || 0}
        />
        <OverviewCard
          label='Commission To Be Paid'
          value={overviewData?.commissionToBePaid || 0}
        />
        <OverviewCard
          label='Utility Expense'
          value={overviewData?.utilityExpense || 0}
        />
      </div>
      {overviewData?.bills && overviewData.bills.length > 0 ? (
        <BillTable label='All Bills' bills={overviewData.bills} />
      ) : (
        <p className='mt-8 text-center font-semibold'>No Bill Found</p>
      )}
    </section>
  );
};
