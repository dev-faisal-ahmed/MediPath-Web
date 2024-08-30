import { Bill } from '../../bill/model';
import { catchAsync } from '../../../middlewares';
import { Transaction } from '../../transactions/model';
import { generateDateQuery } from '../helper';
import { sendSuccessResponse } from '../../../helpers';

export const getOverView = catchAsync(async (req, res) => {
  const { query } = req;
  const type = query.type as string;
  const limit = Number(query.limit) || 20;

  const dbQuery: Record<string, any> = {};
  const dateQuery = generateDateQuery(type);

  if (dateQuery) dbQuery.date = dateQuery;

  const [transaction] = await Transaction.aggregate([
    { $match: dbQuery },
    {
      $group: {
        _id: null,
        collection: {
          // only increase revenue when type = REVENUE
          $sum: {
            $cond: {
              if: {
                $eq: ['$type', 'REVENUE'],
              },
              then: '$amount',
              else: 0,
            },
          },
        },
        expense: {
          // only increase revenue when type = REVENUE
          $sum: {
            $cond: {
              if: {
                $eq: ['$type', 'EXPENSE'],
              },
              then: '$amount',
              else: 0,
            },
          },
        },
      },
    },
  ]);

  const [billInfo] = await Bill.aggregate([
    { $match: dbQuery },
    {
      $facet: {
        bills: [
          { $limit: limit }, // Limit the bills to 10 documents
          { $group: { _id: null, bills: { $push: '$$ROOT' } } },
          { $project: { _id: 0, bills: 1 } },
        ],
        totals: [
          {
            $group: {
              _id: null,
              revenue: {
                $sum: { $subtract: ['$price', '$discount'] },
              },
              due: {
                $sum: {
                  $subtract: [{ $subtract: ['$price', '$discount'] }, '$paid'],
                },
              },
            },
          },
          { $project: { _id: 0, revenue: 1, due: 1 } },
        ],
      },
    },
    {
      $project: {
        bills: { $arrayElemAt: ['$bills.bills', 0] }, // Extract bills array from the facet
        revenue: { $arrayElemAt: ['$totals.revenue', 0] }, // Extract demand from the facet
        due: { $arrayElemAt: ['$totals.due', 0] }, // Extract due from the facet
      },
    },
  ]);

  const { collection } = transaction;
  const { revenue, due, bills } = billInfo;

  return sendSuccessResponse(res, {
    message: 'Overview retrieved successfully',
    data: { collection, revenue, due, bills },
  });
});
