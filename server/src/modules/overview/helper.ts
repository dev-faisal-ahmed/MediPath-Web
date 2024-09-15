export const generateDateQuery = (type: string | undefined) => {
  if (!type) return null;

  switch (type.toUpperCase()) {
    case 'DAILY': {
      // to avoid time conversion using utc method
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      const end = new Date();
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

export const getDateRangeQuery = (date: Date) => {
  const startDate = new Date(date);
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date(date);
  endDate.setHours(23, 59, 59, 999);

  return { $gte: startDate, $lte: endDate };
};
