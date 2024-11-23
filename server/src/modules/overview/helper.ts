export const generateDateQuery = (type: string | undefined) => {
  if (!type) return null;

  switch (type.toUpperCase()) {
    case 'DAILY': {
      // to handle bangladesh time
      const date = new Date();
      const time = date.getTime() + 21600000;
      const start = new Date(time);
      start.setHours(0, 0, 0, 0);
      const end = new Date(time);
      end.setHours(23, 59, 59, 999);

      return { $gte: start, $lte: end };
    }
    case 'WEEKLY': {
      const start = new Date();
      start.setDate(start.getDate() - 6);
      start.setHours(0, 0, 0, 0);

      const end = new Date();
      end.setHours(23, 59, 59, 999);

      return { $gte: start, $lte: end };
    }
    case 'MONTHLY': {
      const start = new Date();
      start.setDate(1);
      start.setHours(0, 0, 0, 0);

      const end = new Date();
      end.setMonth(end.getMonth() + 1);
      end.setDate(0);
      end.setHours(23, 59, 59, 999);

      return { $gte: start, $lte: end };
    }
    case 'YEARLY': {
      const start = new Date();
      start.setMonth(0);
      start.setMonth(1);
      start.setHours(0, 0, 0, 0);

      const end = new Date();
      end.setFullYear(end.getFullYear() + 1);
      end.setMonth(0);
      end.setDate(0);
      end.setHours(23, 59, 59, 999);

      return { $gte: start, $lte: end };
    }
    default:
      return null;
  }
};

const OFFSET = 21600000; // 6 * 60 * 1000;
export const getDateRangeQuery = (date: Date) => {
  // to convert bangladeshi time zone
  const startDate = new Date(date.getTime() + OFFSET);
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date(date.getTime() + OFFSET);
  endDate.setHours(23, 59, 59, 999);

  return { $gte: startDate, $lte: endDate };
};

export const getMonthRangeQuery = (year: number, month: number) => {
  // Start of the month
  const startDate = new Date(year, month, 1);
  const startTimeInBangladesh = new Date(startDate.getTime() + OFFSET);
  startTimeInBangladesh.setHours(0, 0, 0, 0);

  // End of the month
  const endDate = new Date(year, month + 1, 0); // Day 0 of the next month is the last day of the current month
  const endTimeInBangladesh = new Date(endDate.getTime() + OFFSET);
  endTimeInBangladesh.setHours(23, 59, 59, 999);

  return { $gte: startTimeInBangladesh, $lte: endTimeInBangladesh };
};
