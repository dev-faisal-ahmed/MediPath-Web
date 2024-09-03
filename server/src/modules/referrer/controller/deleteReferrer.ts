import { Referrer } from '../model';
import { AppError } from '../../../utils';
import { catchAsync } from '../../../middlewares';
import { sendSuccessResponse } from '../../../helpers';

export const deleteReferrer = catchAsync(async (req, res) => {
  const { referrerId } = req.params;

  const deletedStatus = await Referrer.updateOne(
    { _id: referrerId },
    { $set: { isDeleted: true } },
  );

  if (!deletedStatus.acknowledged)
    throw new AppError('Failed to delete referer', 400);

  return sendSuccessResponse(res, {
    message: 'Deleted referer 🗑️',
    data: null,
  });
});
