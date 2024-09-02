import { Referer } from '../model';
import { catchAsync } from '../../../middlewares';
import { sendSuccessResponse } from '../../../helpers';
import { addRefererValidationSchema } from '../validation';

export const addReferer = catchAsync(async (req, res) => {
  const payload = await addRefererValidationSchema.parseAsync(req.body);
  const referer = await Referer.create(payload);

  return sendSuccessResponse(res, {
    message: `${payload.type} created..✅`,
    data: referer,
  });
});
