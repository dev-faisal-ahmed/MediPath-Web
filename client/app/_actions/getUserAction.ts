'use server';

import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import { tokenKeys } from '../_data';
import { TLoggedUser } from '../_utils/types';

export const getUserAction = async () => {
  const token = cookies().get(tokenKeys.accessToken)?.value;
  if (!token) return null;
  const decodedUser = jwtDecode(token);
  return decodedUser as TLoggedUser;
};
