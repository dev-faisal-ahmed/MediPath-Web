'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Dispatch, SetStateAction } from 'react';
import { Loader } from '@/components/shared/Loader';
import { DatePicker } from '@/components/shared/form/DatePicker';
import { OVERVIEW_TYPE, useOverviewDetails } from './useOverviewDetails';
import { OverviewCard } from './OverviewCard';
import { BillTable } from './BillTable';
import { format } from 'date-fns';

export const OverviewDetails = () => {
  const {
    date,
    onDateChange,
    isLoading,
    isFetching,
    overviewData,
    type,
    setType,
    month,
    setMonth,
    year,
    setYear,
  } = useOverviewDetails();

  console.log({ month, year });

  if (isLoading || isFetching) return <Loader className='mt-8' />;

  return (
    <section>
      <div className='flex items-center gap-4'>
        <h1 className='text-lg font-semibold'>
          {OVERVIEW_TYPE.DAILY && <span>Date : {format(date, 'PPP')}</span>}
        </h1>

        <div className='ml-auto min-w-[200px]'>
          <PickOverviewType type={type} setType={setType} />
        </div>

        {/* date picker */}
        {type === OVERVIEW_TYPE.DAILY && (
          <DatePicker date={date || new Date()} onDateSelect={onDateChange} />
        )}

        {/* year and month picker */}
        {type === OVERVIEW_TYPE.MONTHLY && (
          <PickYearAndDate
            month={month}
            setMonth={setMonth}
            year={year}
            setYear={setYear}
          />
        )}
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

type TPickOverviewTypeProps = {
  type: string;
  setType: Dispatch<SetStateAction<string>>;
};

const PickOverviewType = ({ type, setType }: TPickOverviewTypeProps) => {
  return (
    <Select value={type} onValueChange={setType}>
      <SelectTrigger className='bg-white'>
        <SelectValue placeholder='Choose Overview Type' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={OVERVIEW_TYPE.DAILY}>
          {OVERVIEW_TYPE.DAILY}
        </SelectItem>
        <SelectItem value={OVERVIEW_TYPE.MONTHLY}>
          {OVERVIEW_TYPE.MONTHLY}
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

type TPickYearAndDateProps = {
  year: string;
  setYear: Dispatch<SetStateAction<string>>;
  month: string;
  setMonth: Dispatch<SetStateAction<string>>;
};

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const PickYearAndDate = ({
  year,
  setYear,
  month,
  setMonth,
}: TPickYearAndDateProps) => {
  return (
    <div className='flex items-center justify-center gap-3'>
      <Select value={year} onValueChange={setYear}>
        <SelectTrigger className='min-w-[80px] bg-white'>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='2024'>2024</SelectItem>
          <SelectItem value='2025'>2025</SelectItem>
        </SelectContent>
      </Select>
      <Select value={month} onValueChange={setMonth}>
        <SelectTrigger className='min-w-[80px] bg-white'>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {months.map((month, index) => (
            <SelectItem key={index} value={index.toString()}>
              {month}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
