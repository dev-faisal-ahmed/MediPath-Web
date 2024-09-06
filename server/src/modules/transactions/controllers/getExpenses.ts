import { Transaction } from '../model';
import { catchAsync } from '../../../middlewares';
import { sendSuccessResponse } from '../../../helpers';

export const getExpenses = catchAsync(async (req, res) => {
  const expenses = await Transaction.find({ category: 'UTILITY_EXPENSE' });

  return sendSuccessResponse(res, {
    message: 'Expenses retrieved successfully',
    data: expenses,
  });
});
