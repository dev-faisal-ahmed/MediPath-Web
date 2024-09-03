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
    {
      $lookup: {
        from: 'transactions',
        localField: '_id',
        foreignField: 'referrerId',
        as: 'transactions',
      },
    },
    {
      $addFields: {
        commission: { $sum: '$bills.commission' },
        paid: { $sum: '$transactions.amount' },
      },
    },
  ]);

  return sendSuccessResponse(res, {
    message: 'Referrers retrieved',
    data: referrers,
  });
});
