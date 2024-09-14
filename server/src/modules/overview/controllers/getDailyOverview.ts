import { Transaction } from '../../transactions/model';
import { catchAsync } from '../../../middlewares';
import { getDateRangeQuery } from '../helper';
import { Bill } from '../../bill/model';
import { sendSuccessResponse } from '../../../helpers';

export const getDailyOverview = catchAsync(async (req, res) => {
  const date = req.query.date as string;

  const dateQuery = getDateRangeQuery(date ? new Date(date) : new Date());
  const dbQuery: Record<string, any> = {};
  dbQuery['date'] = dateQuery;

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
        utilityExpense: {
          // only increase revenue when type = REVENUE
          $sum: {
            $cond: {
              if: {
                $eq: ['$category', 'UTILITY_EXPENSE'],
              },
              then: '$amount',
              else: 0,
            },
          },
        },
        commission: {
          // only increase commission when category = REFER_EXPENSE
          $sum: {
            $cond: {
              if: {
                $eq: ['$category', 'REFER_EXPENSE'],
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
          { $sort: { date: -1 } },
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
              commissionToBePaid: {
                $sum: '$commission',
              },
            },
          },
          { $project: { _id: 0, revenue: 1, due: 1, commissionToBePaid: 1 } },
        ],
      },
    },
    {
      $project: {
        // Extract bills array from the facet
        bills: { $arrayElemAt: ['$bills.bills', 0] },
        // Extract demand from the facet
        revenue: { $arrayElemAt: ['$totals.revenue', 0] },
        // Extract due from the facet
        due: { $arrayElemAt: ['$totals.due', 0] },
        // Extract commission from the facet
        commissionToBePaid: { $arrayElemAt: ['$totals.commissionToBePaid', 0] },
      },
    },
  ]);

  const { collection, commission, utilityExpense } = transaction;
  const { revenue, due, bills, commissionToBePaid } = billInfo;

  return sendSuccessResponse(res, {
    message: 'Overview retrieved successfully',
    data: {
      collection,
      revenue,
      utilityExpense,
      due,
      commission,
      balance: collection - commission - utilityExpense,
      commissionToBePaid,
      bills,
    },
  });
});
