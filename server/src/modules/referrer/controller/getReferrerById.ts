import { Schema } from 'mongoose';
import { Referrer } from '../model';
import { catchAsync } from '../../../middlewares';
import { sendSuccessResponse } from '../../../helpers';

export const getReferrerById = catchAsync(async (req, res) => {
  const { referredId } = req.params;

  const referrerDetails = await Referrer.aggregate([
    { $match: { isDeleted: false, _id: new Schema.ObjectId(referredId) } },
  ]);

  return sendSuccessResponse(res, {
    message: 'Referrer details retrieved',
    data: referrerDetails,
  });
});
