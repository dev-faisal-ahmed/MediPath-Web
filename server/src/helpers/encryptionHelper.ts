import bcrypt from 'bcrypt';
import { SALT } from '../app/config';

export const encryptPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, SALT);
  return hashedPassword;
};
