import { Bill } from '../model';
import { AppError } from '../../../utils';
import { catchAsync } from '../../../middlewares';
import { sendSuccessResponse } from '../../../helpers';
import { generateBillValidationSchema } from '../validation';

const totalDigit = 5;

export const generateBill = catchAsync(async (req, res) => {
  // validation
  const payload = await generateBillValidationSchema.parseAsync(req.body);

  // generating total price
  const price = payload.services.reduce((total, service) => {
    total += service.price;
    return total;
  }, 0);

  const userNamePart = payload.patientInfo.name.slice(0, 2).toUpperCase();

  const billCount = await Bill.countDocuments({
    billId: { $regex: userNamePart, $options: 'i' },
  });

  // generating billId
  let billId = userNamePart + '-';
  const remaining = totalDigit - billCount.toString().length;
  for (let i = 1; i <= remaining; i++) billId += '0';
  billId += (billCount + 1).toString();

  // creating bill
  const bill = await Bill.create({ ...payload, price, billId });
  if (!bill) throw new AppError('Failed to generate bill', 400);

  // sending response
  return sendSuccessResponse(res, {
    message: 'Bill Generated Successfully',
    data: { billId },
  });
});
