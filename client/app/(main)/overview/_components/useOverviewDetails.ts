import { useGetDailyOverviewQuery } from '@/app/_redux/services';
import { useState } from 'react';

export const useOverviewDetails = () => {
  const [date, setDate] = useState<Date>(new Date());
  const {
    data: overviewDetails,
    isLoading,
    isFetching,
  } = useGetDailyOverviewQuery(date.toISOString());

  // handlers
  const onDateChange = (date: Date | undefined) => {
    setDate(date || new Date());
  };

  return {
    date,
    onDateChange,
    overviewData: overviewDetails?.data,
    isLoading,
    isFetching,
  };
};
