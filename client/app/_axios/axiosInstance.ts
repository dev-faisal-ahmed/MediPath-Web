import axios from 'axios';
import { getAccessTokenAction } from '../_actions';

export const axiosInstance = axios.create();
axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';
axiosInstance.defaults.headers['Accept'] = 'application/json';
axiosInstance.defaults.timeout = 60000;

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async function (config) {
    const accessToken = await getAccessTokenAction();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },

  function (error) {
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  //@ts-ignore
  function (response) {
    return {
      ok: response?.data.ok,
      data: response?.data?.data,
      meta: response?.data?.meta,
      message: response?.data.message,
    };
  },

  async function (error) {
    return Promise.reject(error);
  },
);
