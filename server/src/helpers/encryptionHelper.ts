import bcrypt from 'bcrypt';
import { SALT } from '../app/config';

export const encryptPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, SALT);
  return hashedPassword;
};

export const isPasswordMatch = async (
  password: string,
  hashedPassword: string,
) => {
  const isMatched = await bcrypt.compare(password, hashedPassword);
  return isMatched;
};
