import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { axiosInstance } from './axiosInstance';

export const axiosBaseQuery = ({ baseUrl } = { baseUrl: '' }): BaseQueryFn => {
  return async ({ url, method, params, headers, body }) => {
    try {
      const result: any = await axiosInstance({
        url: baseUrl + '/' + url,
        method,
        data: body,
        params,
        headers,
      });

      return { data: result };
    } catch (err: any) {
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
};
