'use server';

import { cookies } from 'next/headers';
import { tokenKeys } from '../_data';

export const getAccessTokenAction = async () => {
  const token = cookies().get(tokenKeys.accessToken)?.value;
  return token;
};
