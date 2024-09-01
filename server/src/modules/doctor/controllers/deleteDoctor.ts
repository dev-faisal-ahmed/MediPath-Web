import { sendSuccessResponse } from '../../../helpers';
import { catchAsync } from '../../../middlewares';
import { AppError } from '../../../utils';
import { Doctor } from '../model';

export const deleteDoctor = catchAsync(async (req, res) => {
  const { doctorId } = req.params;

  const deletedStatus = await Doctor.updateOne(
    { _id: doctorId },
    { $set: { isDeleted: true } },
  );

  if (!deletedStatus.acknowledged)
    throw new AppError('Failed to delete doctor', 400);

  return sendSuccessResponse(res, { message: 'Doctor Deleted🗑️', data: null });
});
