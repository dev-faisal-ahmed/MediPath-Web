import { sendSuccessResponse } from '../../../helpers';
import { updateCommissionSchema } from '../validation';
import { catchAsync } from '../../../middlewares';
import { AppError } from '../../../utils';
import { Bill } from '../model';

export const updateCommission = catchAsync(async (req, res) => {
  const payload = await updateCommissionSchema.parseAsync(req.body);
  const { billId } = req.params;

  const updatedBill = await Bill.updateOne(
    { _id: billId },
    { $set: { commission: payload.amount } },
  );

  if (!updatedBill.acknowledged)
    throw new AppError('Failed to updated commission', 400);

  return sendSuccessResponse(res, {
    message: 'Commission updated successfully!',
    data: null,
  });
});
