export const generateDateQuery = (type: string | undefined) => {
  if (!type) return null;

  switch (type.toUpperCase()) {
    case 'DAILY': {
      // to avoid time conversion using utc method
      const start = new Date();
      start.setUTCHours(0, 0, 0, 0);
      const end = new Date();
      end.setUTCHours(23, 59, 59, 999);

      return { $gte: start, $lte: end };
    }
    case 'WEEKLY': {
      const start = new Date();
      start.setUTCDate(start.getUTCDate() - 6);
      start.setUTCHours(0, 0, 0, 0);

      const end = new Date();
      end.setUTCHours(23, 59, 59, 999);

      return { $gte: start, $lte: end };
    }
    case 'MONTHLY': {
      const start = new Date();
      start.setUTCDate(1);
      start.setUTCHours(0, 0, 0, 0);

      const end = new Date();
      end.setUTCMonth(end.getUTCMonth() + 1);
      end.setUTCDate(0);
      end.setUTCHours(23, 59, 59, 999);

      return { $gte: start, $lte: end };
    }
    case 'YEARLY': {
      const start = new Date();
      start.setUTCMonth(0);
      start.setUTCDate(1);
      start.setUTCHours(0, 0, 0, 0);

      const end = new Date();
      end.setUTCFullYear(end.getUTCFullYear() + 1);
      end.setUTCMonth(0);
      end.setUTCDate(0);
      end.setUTCHours(23, 59, 59, 999);

      return { $gte: start, $lte: end };
    }
    default:
      return null;
  }
};
