import { Transaction } from '../model';
import { catchAsync } from '../../../middlewares';
import { sendSuccessResponse } from '../../../helpers';
import { giveCommissionValidationSchema } from '../validation';

export const giveCommission = catchAsync(async (req, res) => {
  const payload = await giveCommissionValidationSchema.parseAsync(req.body);

  const transaction = await Transaction.create({
    amount: payload.amount,
    referrerId: payload.referrerId,
    category: 'REFER_EXPENSE',
    type: 'EXPENSE',
    description: payload.description,
  });

  sendSuccessResponse(res, {
    message: 'Commission is given',
    data: transaction,
  });
});
