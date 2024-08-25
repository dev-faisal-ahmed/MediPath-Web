'use server';

import { cookies } from 'next/headers';
import { tokenKeys } from '../_data';
import { redirect } from 'next/navigation';

export const authGuardAction = async () => {
  const token = cookies().get(tokenKeys.accessToken)?.value;
  if (!token) redirect('/login');
};
