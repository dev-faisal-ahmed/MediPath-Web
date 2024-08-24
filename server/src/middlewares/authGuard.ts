import { AppError } from '../utils';
import { catchAsync } from './catchAsync';
import { User } from '../modules/user/model';
import { verifyAccessToken } from '../helpers';

const BEARER = 'bearer';

export const authGuard = catchAsync(async (req, _, next) => {
  const token = req.headers.authorization;
  if (!token) throw new AppError('No token found', 404);

  const [bearer, authToken] = token.split(' ');
  if (BEARER !== bearer.toLowerCase())
    throw new AppError('Invalid token formate', 400);

  // verifying the token
  const decodedUser = verifyAccessToken(authToken);
  if (!decodedUser) throw new AppError('Invalid token', 400);

  const { _id } = decodedUser;
  const isUserExist = await User.findOne({ _id });

  if (!isUserExist)
    throw new AppError('You are not authorized for this service', 400);

  req.user = isUserExist;
  next();
});
