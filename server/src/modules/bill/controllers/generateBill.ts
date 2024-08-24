import mongoose from 'mongoose';
import { Bill } from '../model';
import { Patient } from '../../patient/model';
import { AppError } from '../../../utils';
import { catchAsync } from '../../../middlewares';
import { sendSuccessResponse } from '../../../helpers';
import { generateBillValidationSchema } from '../validation';

export const generateBill = catchAsync(async (req, res) => {
  // validation
  const payload = await generateBillValidationSchema.parseAsync(req.body);
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // creating patient
    let patient = await Patient.findOne({ phone: payload.patientInfo.phone });
    if (!patient) {
      [patient] = await Patient.create([payload.patientInfo], { session });
      if (!patient) throw new AppError('Failed to add patient', 400);
    }

    // generating total price
    const price = payload.services.reduce((total, service) => {
      total += service.price;
      return total;
    }, 0);

    // creating bill
    const [bill] = await Bill.create(
      [{ ...payload, patientId: patient._id, price }],
      { session },
    );

    if (!bill) throw new AppError('Failed to generate bill', 400);

    await session.commitTransaction();
    await session.endSession();

    // sending response
    return sendSuccessResponse(res, {
      message: 'Bill Generated Successfully',
      data: { billId: bill._id },
    });
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();

    if (error instanceof AppError)
      throw new AppError(error.message, error.status);
    throw new Error(error?.message);
  }
});
