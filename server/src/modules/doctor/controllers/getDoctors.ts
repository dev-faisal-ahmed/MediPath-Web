import { sendSuccessResponse } from '../../../helpers';
import { catchAsync } from '../../../middlewares';
import { Doctor } from '../model';

export const getDoctors = catchAsync(async (req, res) => {
  const doctors = await Doctor.find();

  return sendSuccessResponse(res, {
    message: 'Doctor retrieved successfully',
    data: doctors,
  });
});
