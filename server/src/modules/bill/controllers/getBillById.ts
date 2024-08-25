import { sendSuccessResponse } from '../../../helpers';
import { catchAsync } from '../../../middlewares';
import { Bill } from '../model';

export const getBillById = catchAsync(async (req, res) => {
  const { billId } = req.params;
  const bill = await Bill.findOne({ _id: billId })
    .populate('patientId')
    .populate('doctorRefId')
    .populate('agentRefId');

  return sendSuccessResponse(res, {
    message: 'Bill retrieved successfully',
    data: bill,
  });
});