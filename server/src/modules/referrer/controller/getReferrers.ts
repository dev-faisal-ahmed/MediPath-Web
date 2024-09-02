import { Referrer } from '../model';
import { catchAsync } from '../../../middlewares';
import { sendSuccessResponse } from '../../../helpers';

export const getReferrers = catchAsync(async (req, res) => {
  const referrers = await Referrer.aggregate([
    { $match: { isDeleted: false } },
  ]);

  return sendSuccessResponse(res, {
    message: 'Referrers retrieved',
    data: referrers,
  });
});
