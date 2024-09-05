import mongoose from 'mongoose';
import { Bill } from '../model';
import { AppError } from '../../../utils';
import { catchAsync } from '../../../middlewares';
import { Transaction } from '../../transactions/model';
import { sendSuccessResponse } from '../../../helpers';
import { takeDueValidationSchema } from '../validation';

export const takeDue = catchAsync(async (req, res) => {
  // validation
  const { price } = await takeDueValidationSchema.parseAsync(req.body);
  const { billId } = req.params;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

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
      { session },
    );

    if (!updatedBill.acknowledged) throw 'Failed to take due try again';

    // adding transaction
    const transaction = await Transaction.create(
      [
        {
          billId: bill._id,
          amount: price,
          type: 'REVENUE',
          description: `Collected due ${price} TK`,
          category: 'SERVICE_REVENUE',
        },
      ],
      { session },
    );

    if (!transaction) throw 'Failed to take due try again';
    await session.commitTransaction();

    return sendSuccessResponse(res, {
      message: 'Due has taken successfully',
      data: null,
    });
  } catch (error) {
    await session.abortTransaction();
    throw new AppError(error.message, error.status);
  } finally {
    await session.endSession();
  }
});
