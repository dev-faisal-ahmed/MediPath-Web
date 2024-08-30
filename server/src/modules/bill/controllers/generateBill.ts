import mongoose from 'mongoose';
import { Bill } from '../model';
import { AppError } from '../../../utils';
import { catchAsync } from '../../../middlewares';
import { Transaction } from '../../transactions/model';
import { generateBillValidationSchema } from '../validation';
import { generateBillId, sendSuccessResponse } from '../../../helpers';

export const generateBill = catchAsync(async (req, res) => {
  // validation
  const payload = await generateBillValidationSchema.parseAsync(req.body);
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // calculating total price
    const price = payload.services.reduce((total, service) => {
      total += service.price;
      return total;
    }, 0);

    // generating billId
    let isBillIdMatch = false;
    let billId: string;

    while (!isBillIdMatch) {
      billId = generateBillId();
      // checking if this billId match
      const isBillExist = await Bill.findOne({ billId });
      if (!isBillExist) isBillIdMatch = true;
    }

    // creating bill
    const bill = await Bill.create({ ...payload, price, billId });
    if (!bill) throw new AppError('Failed to generate bill', 400);

    // creating transaction
    const transaction = await Transaction.create({
      amount: payload.paid,
      billId: bill._id,
      type: 'REVENUE',
      description: `Paid ${payload.paid}`,
    });

    if (!transaction) throw new AppError('Failed to generate bill', 400);
    await session.commitTransaction();

    return sendSuccessResponse(res, {
      message: 'Bill Generated Successfully',
      data: { billId },
    });
  } catch (error: any) {
    await session.abortTransaction();
    throw new AppError(error.message, error.status);
  } finally {
    await session.endSession();
  }
});
