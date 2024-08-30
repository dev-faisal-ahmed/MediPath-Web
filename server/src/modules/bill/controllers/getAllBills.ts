import { sendSuccessResponse } from '../../../helpers';
import { catchAsync } from '../../../middlewares';
import { Bill } from '../model';

export const getAllBills = catchAsync(async (req, res) => {
  const { query } = req;
  const name = query.name;
  const billId = query.billId;

  // pagination
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 30;
  const dbQuery: Record<string, any> = {};

  if (name) dbQuery['patientInfo.name'] = { $regex: name, $options: 'i' };
  if (billId) dbQuery['billId'] = { $regex: billId, $options: 'i' };

  const bills = await Bill.find(dbQuery)
    .sort({ date: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Bill.countDocuments(dbQuery);
  const totalPages = Math.ceil(total / limit);

  return sendSuccessResponse(res, {
    message: 'Bills retrieved successfully',
    meta: { page, limit, total, totalPages },
    data: bills,
  });
});
