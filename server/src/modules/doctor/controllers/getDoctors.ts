import { sendSuccessResponse } from '../../../helpers';
import { catchAsync } from '../../../middlewares';
import { Doctor } from '../model';

export const getDoctors = catchAsync(async (_req, res) => {
  const doctors = await Doctor.find({ isDeleted: false }).sort({
    createdAt: -1,
  });

  return sendSuccessResponse(res, {
    message: 'Doctor retrieved successfully',
    data: doctors,
  });
});
