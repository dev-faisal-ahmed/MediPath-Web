import {
  useGetDailyOverviewQuery,
  useGetMonthlyOverviewQuery,
} from '@/app/_redux/services';
import { useState } from 'react';

export enum OVERVIEW_TYPE {
  MONTHLY = 'MONTHLY',
  DAILY = 'DAILY',
}

const date = new Date();

export const useOverviewDetails = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [type, setType] = useState<string>(OVERVIEW_TYPE.DAILY);
  const [year, setYear] = useState<string>(date.getFullYear().toString());
  const [month, setMonth] = useState<string>(date.getMonth().toString());

  const {
    data: dailyOverviewDetails,
    isLoading: isDailyOverviewLoading,
    isFetching: isDailyOverviewFetching,
  } = useGetDailyOverviewQuery(date.toISOString());

  const {
    data: monthlyOverviewDetails,
    isLoading: isMonthlyOverviewLoading,
    isFetching: isMonthlyOverviewFetching,
  } = useGetMonthlyOverviewQuery({ month, year });

  // handlers
  const onDateChange = (date: Date | undefined) => {
    setDate(date || new Date());
  };

  return {
    date,
    onDateChange,
    year,
    setYear,
    month,
    setMonth,
    type,
    setType,

    overviewData:
      type === OVERVIEW_TYPE.DAILY
        ? dailyOverviewDetails?.data
        : monthlyOverviewDetails?.data,
    isLoading:
      type === OVERVIEW_TYPE.DAILY
        ? isDailyOverviewLoading
        : isMonthlyOverviewLoading,
    isFetching:
      type === OVERVIEW_TYPE.DAILY
        ? isDailyOverviewFetching
        : isMonthlyOverviewFetching,
  };
};
