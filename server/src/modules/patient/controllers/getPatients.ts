import { sendSuccessResponse } from '../../../helpers';
import { catchAsync } from '../../../middlewares';
import { Patient } from '../model';

export const getPatients = catchAsync(async (req, res) => {
  const patients = await Patient.find();
  return sendSuccessResponse(res, {
    message: 'Patients retrieved successfully',
    data: patients,
  });
});
