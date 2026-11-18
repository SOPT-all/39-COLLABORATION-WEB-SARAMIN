import { axiosInstance } from '@/shared/api/config/axios-instance';
import type { ApiResponse } from '@/shared/types/api';
import type { Keyword } from '@/shared/types/keyword';

// MY FIT 키워드를 등록 순서대로 조회. 등록한 키워드가 없으면 빈 배열로 응답
export const getMyKeywords = async () => {
  const { data } =
    await axiosInstance.get<ApiResponse<Keyword[]>>('/users/me/keywords');

  return data.data;
};
