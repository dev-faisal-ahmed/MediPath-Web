'use server';

import { cookies } from 'next/headers';
import { fetchOption } from '../_helpers';
import { apiUrl, tokenKeys } from '../_data';

type TPayload = {
  userId: string;
  password: string;
};

export const loginAction = async ({ userId, password }: TPayload) => {
  const response = await fetch(
    apiUrl.login,
    fetchOption({ method: 'POST', body: { userId, password } }),
  );

  const responseData = await response.json();
  if (responseData?.ok)
    cookies().set(tokenKeys.accessToken, responseData?.data?.token);

  return responseData;
};
