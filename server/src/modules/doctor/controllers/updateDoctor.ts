import { sendSuccessResponse } from '../../../helpers';
import { catchAsync } from '../../../middlewares';
import { Doctor } from '../model';
import { updateDoctorValidationSchema } from '../validation';

export const updateDoctor = catchAsync(async (req, res) => {
  const payload = await updateDoctorValidationSchema.parseAsync(req.body);
  const { doctorId } = req.params;

  const updatedDoctorInfo = await Doctor.findOneAndUpdate(
    { _id: doctorId },
    { $set: payload },
    { runValidators: true, new: true },
  );

  return sendSuccessResponse(res, {
    message: 'Doctor updated✅',
    data: updatedDoctorInfo,
  });
});
