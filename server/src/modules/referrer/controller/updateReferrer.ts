import { Referrer } from '../model';
import { AppError } from '../../../utils';
import { catchAsync } from '../../../middlewares';
import { sendSuccessResponse } from '../../../helpers';
import { updateRefererValidationSchema } from '../validation';

export const updateReferrer = catchAsync(async (req, res) => {
  const payload = await updateRefererValidationSchema.parseAsync(req.body);
  const { referrerId } = req.params;

  const updatedStatus = await Referrer.updateOne(
    { _id: referrerId },
    { $set: payload },
  );

  if (!updatedStatus.acknowledged)
    throw new AppError('Failed to update referer🚫', 400);

  return sendSuccessResponse(res, {
    message: 'Updated Referer ✅',
    data: null,
  });
});
