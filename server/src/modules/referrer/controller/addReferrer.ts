import { Referrer } from '../model';
import { catchAsync } from '../../../middlewares';
import { sendSuccessResponse } from '../../../helpers';
import { addRefererValidationSchema } from '../validation';

export const addReferrer = catchAsync(async (req, res) => {
  const payload = await addRefererValidationSchema.parseAsync(req.body);
  const referer = await Referrer.create(payload);

  return sendSuccessResponse(res, {
    message: `${payload.type} created..✅`,
    data: referer,
  });
});
