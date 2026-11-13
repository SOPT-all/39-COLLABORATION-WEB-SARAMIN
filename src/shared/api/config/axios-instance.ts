import axios, { AxiosError } from 'axios';

import type { ApiErrorResponse } from '@/shared/types/api';

const REQUEST_TIMEOUT_MS = 10_000;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
  },
  // 배열 파라미터를 keywords=A&keywords=B 형식으로 보내요.
  // axios 기본값(keywords[]=A)은 서버가 인식하지 못해서 검색 결과가 0건으로 와요.
  paramsSerializer: { indexes: null },
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
