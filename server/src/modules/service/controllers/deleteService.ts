import { sendSuccessResponse } from '../../../helpers';
import { catchAsync } from '../../../middlewares';
import { AppError } from '../../../utils';
import { Service } from '../model';

export const deleteService = catchAsync(async (req, res) => {
  const { serviceId } = req.params;

  const deletedStatus = await Service.deleteOne({ _id: serviceId });
  if (!deletedStatus.acknowledged)
    throw new AppError('Failed to delete service', 400);

  return sendSuccessResponse(res, {
    message: 'Service deleted 🗑️',
    data: null,
  });
});
