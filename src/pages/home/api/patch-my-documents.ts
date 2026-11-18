import type { MyDocuments } from '@/pages/home/types/my-documents';
import { axiosInstance } from '@/shared/api/config/axios-instance';
import type { ApiResponse } from '@/shared/types/api';

// 보유 서류 체크 상태 전체 덮어쓰기. 체크 해제는 false 전송
export const patchMyDocuments = async (documents: MyDocuments) => {
  const response = await axiosInstance.patch<ApiResponse<MyDocuments>>(
    '/users/me/documents',
    documents,
  );

  return response.data.data;
};
