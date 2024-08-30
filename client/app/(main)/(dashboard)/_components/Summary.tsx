'use client';

import * as select from '@/components/ui/select';
import { Loader } from '@/components/shared/Loader';
import { useState } from 'react';
import { SummaryCard } from './SummaryCard';
import { FaMoneyBills } from 'react-icons/fa6';
import { TOverViewType } from '@/app/_utils/types';
import { FaMoneyBillWheat } from 'react-icons/fa6';
import { FaMoneyBillTrendUp } from 'react-icons/fa6';
import { useGetOverviewQuery } from '@/app/_redux/services';

const getMessage = (type: TOverViewType) => {
  switch (type) {
    case 'DAILY':
      return 'Summary of Today';
    case 'WEEKLY':
      return 'Summary of This Week';
    case 'MONTHLY':
      return 'Summary of This Month';
    case 'YEARLY':
      return 'Summary of This Year';
  }
};

export const Summary = () => {
  const [type, setType] = useState<TOverViewType>('DAILY');
  const {
    data: overviewData,
    isLoading,
    isFetching,
  } = useGetOverviewQuery(type);

  if (isLoading || isFetching) return <Loader className='mt-8' />;

  return (
    <section className='mt-1'>
      <div className='flex items-center justify-between gap-6'>
        <h1 className='text-lg font-semibold'>{getMessage(type)}</h1>
        <select.Select
          value={type}
          onValueChange={(val: TOverViewType) => setType(val)}
        >
          <select.SelectTrigger className='w-32'>
            <select.SelectValue placeholder='Select Any Type' />
          </select.SelectTrigger>
          <select.SelectContent>
            <select.SelectItem value='DAILY'>Daily</select.SelectItem>
            <select.SelectItem value='WEEKLY'>Weekly</select.SelectItem>
            <select.SelectItem value='MONTHLY'>Monthly</select.SelectItem>
            <select.SelectItem value='YEARLY'>Yearly</select.SelectItem>
          </select.SelectContent>
        </select.Select>
      </div>
      <div className='mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        <SummaryCard
          title='Revenue'
          value={overviewData?.data?.revenue || 0}
          icon={<FaMoneyBillTrendUp size={30} />}
        />
        <SummaryCard
          title='Collection'
          value={overviewData?.data?.collection || 0}
          icon={<FaMoneyBillWheat size={30} />}
        />
        <SummaryCard
          title='Due'
          value={overviewData?.data?.due || 0}
          icon={<FaMoneyBills size={30} />}
        />
      </div>
    </section>
  );
};
