import {
  isPasswordMatch,
  generateAccessToken,
  sendSuccessResponse,
} from '../../../helpers';
import { catchAsync } from '../../../middlewares';
import { AppError } from '../../../utils';
import { User } from '../../user/model';
import { loginValidationSchema } from '../validation';

export const login = catchAsync(async (req, res) => {
  // validation
  const payload = await loginValidationSchema.parseAsync(req.body);

  // getting user info
  const userInfo = await User.findOne({ userId: payload.userId });
  if (!userInfo) throw new AppError('User not found', 404);

  // matching password
  const isMatched = await isPasswordMatch(payload.password, userInfo.password);
  if (!isMatched) throw new AppError('Password does not match', 400);

  // generating token
  const { _id, name, userId, role } = userInfo;
  const { token } = generateAccessToken({ _id, name, userId, role });

  // sending response
  return sendSuccessResponse(res, {
    message: 'Login successful',
    data: { token },
  });
});
