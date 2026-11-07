import type { RecruitDetail } from '@/pages/home/types/recruit';
import { axiosInstance } from '@/shared/api/config/axios-instance';
import type { ApiResponse } from '@/shared/types/api';

export const getRecruitDetail = async (id: number) => {
  const { data } = await axiosInstance.get<ApiResponse<RecruitDetail>>(
    `/recruits/${id}`,
  );
  return data.data;
};
