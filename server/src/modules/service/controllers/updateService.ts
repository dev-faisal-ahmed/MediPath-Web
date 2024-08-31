import { Service } from '../model';
import { AppError } from '../../../utils';
import { catchAsync } from '../../../middlewares';
import { sendSuccessResponse } from '../../../helpers';
import { updateServiceValidationSchema } from '../validation';

export const updateService = catchAsync(async (req, res) => {
  // validation
  const payload = await updateServiceValidationSchema.parseAsync(req.body);
  const { serviceId } = req.params;

  const updatedService = await Service.findOneAndUpdate(
    { _id: serviceId },
    { $set: payload },
    { runValidators: true, new: true },
  );

  if (!updateService) throw new AppError('Failed to update service', 400);

  return sendSuccessResponse(res, {
    message: 'Service Updated!',
    data: updatedService,
  });
});
