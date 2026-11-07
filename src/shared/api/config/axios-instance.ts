import axios, { AxiosError } from 'axios';

import type { ApiErrorResponse } from '@/shared/types/api';

const REQUEST_TIMEOUT_MS = 10_000;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.message ??
      error.message ??
      '알 수 없는 오류가 발생했어요.';

    if (import.meta.env.DEV) {
      console.error(
        `[API Error] ${status ?? 'NETWORK'} ${error.config?.url ?? ''}`,
        message,
      );
    }

    return Promise.reject(error);
  },
);
