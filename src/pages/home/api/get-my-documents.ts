import type { MyDocuments } from '@/pages/home/types/my-documents';
import { axiosInstance } from '@/shared/api/config/axios-instance';
import type { ApiResponse } from '@/shared/types/api';

// 보유 서류 체크 상태 조회. 저장된 값이 없으면 서버가 false로 응답
export const getMyDocuments = async () => {
  const response = await axiosInstance.get<ApiResponse<MyDocuments>>(
    '/users/me/documents',
  );

  return response.data.data;
};
