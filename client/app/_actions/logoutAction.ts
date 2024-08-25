'use server';

import { cookies } from 'next/headers';
import { tokenKeys } from '../_data';

export const logoutAction = async () => {
  cookies().delete(tokenKeys.accessToken);
};
