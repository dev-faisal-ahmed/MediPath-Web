import jwt from 'jsonwebtoken';
import { Schema } from 'mongoose';
import { TRole } from '../modules/user/interface';
import { TOKEN_SECRET } from '../app/config';

interface IPayload {
  _id: Schema.Types.ObjectId;
  userId: string;
  name: string;
  role: TRole;
}

export const generateAccessToken = (payload: IPayload) => {
  const token = jwt.sign(payload, TOKEN_SECRET);
  return { token };
};
