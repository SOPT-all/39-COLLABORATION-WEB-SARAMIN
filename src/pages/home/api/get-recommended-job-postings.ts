import type {
  JobPostingListParams,
  RecommendedJobPostings,
} from '@/pages/home/types/job-posting';
import { axiosInstance } from '@/shared/api/config/axios-instance';
import type { ApiResponse } from '@/shared/types/api';

// 추천 공고를 size개 가져옵니다.
export const getRecommendedJobPostings = async (
  params?: JobPostingListParams,
) => {
  const { data } = await axiosInstance.get<ApiResponse<RecommendedJobPostings>>(
    '/job-postings/recommended',
    { params },
  );
  return data.data;
};
