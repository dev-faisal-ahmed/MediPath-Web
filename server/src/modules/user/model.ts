import { model, Schema } from 'mongoose';
import { userRoles } from './constants';
import { IUser } from './interface';

const userSchema = new Schema<IUser>({
  userId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: userRoles, default: 'ADMIN' },
});

export const User = model<IUser>('user', userSchema);
