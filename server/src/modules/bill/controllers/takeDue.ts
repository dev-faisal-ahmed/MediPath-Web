import { Bill } from '../model';
import { AppError } from '../../../utils';
import { catchAsync } from '../../../middlewares';
import { takeDueValidationSchema } from '../validation';
import { sendSuccessResponse } from '../../../helpers';

export const takeDue = catchAsync(async (req, res) => {
  // validation
  const { price } = await takeDueValidationSchema.parseAsync(req.body);
  const { billId } = req.params;

  const bill = await Bill.findOne({ billId });
  if (!bill) throw new AppError('Bill Not found', 404);

  const due = bill.price - bill.paid;

  if (due < price)
    throw new AppError(
      `You are trying to pay ${price} where due is ${due}`,
      400,
    );

  const updatedBill = await Bill.updateOne(
    { billId },
    { $inc: { paid: price } },
  );

  if (!updatedBill.acknowledged) throw 'Failed to take bill try again';

  return sendSuccessResponse(res, {
    message: 'Due has taken successfully',
    data: null,
  });
});
