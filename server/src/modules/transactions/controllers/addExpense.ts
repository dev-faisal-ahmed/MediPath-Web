import { Transaction } from '../model';
import { catchAsync } from '../../../middlewares';
import { sendSuccessResponse } from '../../../helpers';
import { addExpenseValidationSchema } from '../validation';

export const addExpense = catchAsync(async (req, res) => {
  const payload = await addExpenseValidationSchema.parseAsync(req.body);
  const { amount, description, date } = payload;

  const transaction = await Transaction.create({
    amount,
    date,
    description,
    type: 'EXPENSE',
    category: 'UTILITY_EXPENSE',
  });

  return sendSuccessResponse(res, {
    message: 'Expense added',
    data: transaction,
  });
});
