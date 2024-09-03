import { Referrer } from '../model';
import { catchAsync } from '../../../middlewares';
import { sendSuccessResponse } from '../../../helpers';

export const getReferrers = catchAsync(async (req, res) => {
  const referrers = await Referrer.aggregate([
    { $match: { isDeleted: false } },
    {
      $lookup: {
        from: 'bills',
        localField: '_id',
        foreignField: 'referrer',
        as: 'bills',
      },
    },
    { $addFields: { commission: { $sum: '$bills.commission' } } },
  ]);

  return sendSuccessResponse(res, {
    message: 'Referrers retrieved',
    data: referrers,
  });
});
