import mongoose from 'mongoose';

import { Referrer } from '../model';
import { Transaction } from '../../transactions/model';
import { sendSuccessResponse } from '../../../helpers';
import { catchAsync } from '../../../middlewares';
import { IBill } from '../../bill/interface';
import { AppError } from '../../../utils';

export const getReferrerById = catchAsync(async (req, res) => {
  const { referrerId } = req.params;
  const referrerObjectId = new mongoose.Types.ObjectId(referrerId);

  const [referrerInfo] = await Referrer.aggregate([
    { $match: { _id: referrerObjectId } },

    {
      $lookup: {
        from: 'bills',
        localField: '_id',
        foreignField: 'referrer',
        as: 'referred',
        pipeline: [
          {
            $project: {
              patientInfo: 1,
              price: 1,
              paid: 1,
              discount: 1,
              commission: 1,
              date: 1,
            },
          },
          { $sort: { date: -1 } },
        ],
      },
    },

    {
      $lookup: {
        from: 'bills',
        localField: '_id',
        foreignField: 'visitedBy',
        as: 'visited',
        pipeline: [
          {
            $project: {
              patientInfo: 1,
              price: 1,
              paid: 1,
              discount: 1,
              commission: 1,
              date: 1,
            },
          },
          { $sort: { date: -1 } },
        ],
      },
    },
  ]);

  if (!referrerInfo) throw new AppError('Referrer not found!', 404);

  const { _id, name, designation, type } = referrerInfo;

  let commissionDemand = 0;
  const referred: IBill[] = referrerInfo.referred || [];
  const visited: IBill[] = referrerInfo?.visited || [];

  referred.forEach((bill) => {
    if (bill.commission) commissionDemand += bill.commission;
  });

  visited.forEach((bill) => {
    if (bill.commission) commissionDemand += bill.commission;
  });

  const [transactionInfo] = await Transaction.aggregate([
    {
      $facet: {
        totalCommissionPaid: [
          { $match: { referrerId: referrerObjectId } },

          {
            $group: {
              _id: null,
              givenCommission: {
                $sum: '$amount',
              },
            },
          },
        ],
        transactions: [
          { $match: { referrerId: referrerObjectId } },
          { $sort: { date: 1 } },
        ],
      },
    },
    {
      $project: {
        totalCommissionPaid: {
          $arrayElemAt: ['$totalCommissionPaid.givenCommission', 0],
        },
        transactions: 1,
      },
    },
  ]);

  let totalCommissionPaid = 0;
  let transactions = [];
  if (transactionInfo) {
    totalCommissionPaid = transactionInfo.totalCommissionPaid;
    transactions = transactionInfo.transactions;
  }

  return sendSuccessResponse(res, {
    message: 'ReferrerInfo Retrieved',
    data: {
      _id,
      name,
      type,
      designation,
      commissionDemand,
      totalCommissionPaid,
      referred,
      visited,
      transactions,
    },
  });
});
