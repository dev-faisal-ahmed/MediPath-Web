import { addServiceValidationSchema } from '../validation';
import { sendSuccessResponse } from '../../../helpers';
import { catchAsync } from '../../../middlewares';
import { AppError } from '../../../utils';
import { Service } from '../model';

export const addService = catchAsync(async (req, res) => {
  // validation
  const payload = await addServiceValidationSchema.parseAsync(req.body);

  // checking if service exist or not
  const isServiceExist = await Service.findOne({ name: payload.name });
  if (isServiceExist)
    throw new AppError(`${payload.name} service is already exist`, 400);

  const service = await Service.create(payload);
  if (!service) throw new AppError('Failed to add service', 400);

  return sendSuccessResponse(res, {
    message: 'Service added successfully',
    data: service,
  });
});
