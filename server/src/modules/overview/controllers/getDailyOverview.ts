import { sendSuccessResponse } from '../../../helpers';
import { Transaction } from '../../transactions/model';
import { catchAsync } from '../../../middlewares';
import { getDateRangeQuery } from '../helper';
import { Bill } from '../../bill/model';

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
      $lookup: {
        from: 'referrers',
        localField: 'visitedBy',
        foreignField: '_id',
        pipeline: [{ $project: { name: 1, designation: 1 } }],
        as: 'visitedBy',
      },
    },
    {
      $lookup: {
        from: 'referrers',
        localField: 'referrer',
        foreignField: '_id',
        pipeline: [{ $project: { name: 1, designation: 1 } }],
        as: 'referrer',
      },
    },
    {
      $project: {
        billId: 1,
        patientInfo: 1,
        paid: 1,
        price: 1,
        discount: 1,
        services: 1,
        date: 1,
        visitedBy: { $arrayElemAt: ['$visitedBy', 0] },
        referrer: { $arrayElemAt: ['$referrer', 0] },
      },
    },
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
              revenue: { $sum: { $subtract: ['$price', '$discount'] } },
              due: {
                $sum: {
                  $subtract: [{ $subtract: ['$price', '$discount'] }, '$paid'],
                },
              },
              commissionToBePaid: { $sum: '$commission' },
            },
          },
          { $project: { _id: 0, revenue: 1, due: 1, commissionToBePaid: 1 } },
        ],
      },
    },
    {
      $project: {
        bills: { $arrayElemAt: ['$bills.bills', 0] },
        revenue: { $arrayElemAt: ['$totals.revenue', 0] },
        due: { $arrayElemAt: ['$totals.due', 0] },
        commissionToBePaid: { $arrayElemAt: ['$totals.commissionToBePaid', 0] },
      },
    },
  ]);

  const collection = transaction?.collection;
  const commission = transaction?.commission;
  const utilityExpense = transaction?.utilityExpense;
  const revenue = billInfo?.revenue;
  const due = billInfo?.due;
  const commissionToBePaid = billInfo?.commissionToBePaid;
  const bills = billInfo?.bills;

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
      total: bills.length,
      bills,
    },
  });
});
