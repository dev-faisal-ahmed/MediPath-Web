import { sendSuccessResponse } from '../../../helpers';
import { catchAsync } from '../../../middlewares';
import { AppError } from '../../../utils';
import { Doctor } from '../model';
import { addDoctorValidationSchema } from '../validation';

export const addDoctor = catchAsync(async (req, res) => {
  // validation
  const payload = await addDoctorValidationSchema.parseAsync(req.body);

  // checking if doctor exist
  const isDoctorExist = await Doctor.findOne({ phone: payload.phone });
  if (isDoctorExist) throw new AppError('This phone number already exist', 400);

  const doctor = await Doctor.create(payload);
  if (!doctor) throw new AppError('Failed to create new doctor', 400);

  return sendSuccessResponse(res, { message: 'Doctor Created', data: doctor });
});
