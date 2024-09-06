'use client';

import * as select from '@/components/ui/select';
import { Loader } from '@/components/shared/Loader';
import { updateType } from '@/app/_redux/slices';
import { SummaryCard } from './SummaryCard';
import { FaMoneyBills } from 'react-icons/fa6';
import { FaMoneyCheck } from 'react-icons/fa6';
import { FaBalanceScale } from 'react-icons/fa';
import { FaMoneyBillWave } from 'react-icons/fa6';
import { TOverViewType } from '@/app/_utils/types';
import { FaMoneyBillWheat } from 'react-icons/fa6';
import { FaMoneyBillTrendUp } from 'react-icons/fa6';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { useGetOverviewQuery } from '@/app/_redux/services';
import { useAppDispatch, useAppSelector } from '@/app/_redux/hooks';

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
  const { type } = useAppSelector((state) => state.global);
  const dispatch = useAppDispatch();
  const {
    data: overviewData,
    isLoading,
    isFetching,
  } = useGetOverviewQuery(type);

  if (isLoading)
    return (
      <div className='flex h-32 w-full items-center justify-center rounded-md border border-input'>
        <Loader className='mt-8' />;
      </div>
    );

  return (
    <section className='mt-1'>
      <div className='flex items-center justify-between gap-6'>
        <h1 className='text-lg font-semibold'>{getMessage(type)}</h1>
        <select.Select
          value={type}
          onValueChange={(val: TOverViewType) => dispatch(updateType(val))}
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
      <div className='mt-6 flex items-center gap-3'>
        <SummaryCard
          title='Balance'
          value={overviewData?.data?.balance || 0}
          icon={<FaBalanceScale size={24} />}
        />
        <SummaryCard
          title='Revenue'
          value={overviewData?.data?.revenue || 0}
          icon={<FaMoneyBillTrendUp size={24} />}
        />
        <SummaryCard
          title='Collection'
          value={overviewData?.data?.collection || 0}
          icon={<FaMoneyBillWheat size={24} />}
        />
      </div>
      <div className='mt-3 flex items-center gap-3'>
        <SummaryCard
          title='Due'
          value={overviewData?.data?.due || 0}
          icon={<FaMoneyBills size={24} />}
        />
        <SummaryCard
          title='Commission To Be Paid'
          value={overviewData?.data?.commissionToBePaid || 0}
          icon={<FaMoneyBillWave size={24} />}
        />
        <SummaryCard
          title='Commission Paid'
          value={overviewData?.data?.commission || 0}
          icon={<FaMoneyCheck size={24} />}
        />
        <SummaryCard
          title='Utility Expense'
          value={overviewData?.data?.utilityExpense || 0}
          icon={<FaMoneyCheckAlt size={24} />}
        />
      </div>
    </section>
  );
};
