import { sendSuccessResponse } from '../../../helpers';
import { catchAsync } from '../../../middlewares';
import { Service } from '../model';

export const getServices = catchAsync(async (req, res) => {
  const services = await Service.find().sort({ name: 1 });

  return sendSuccessResponse(res, {
    message: 'Services retrieved successfully',
    data: services,
  });
});
