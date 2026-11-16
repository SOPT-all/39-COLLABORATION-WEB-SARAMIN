import type {
  JobPosting,
  JobPostingListParams,
} from '@/pages/home/types/job-posting';
import { axiosInstance } from '@/shared/api/config/axios-instance';
import type { ApiResponse } from '@/shared/types/api';

// 내가 조회했던 공고를 size개까지 가져와요.
export const getViewedJobPostings = async (params?: JobPostingListParams) => {
  const { data } = await axiosInstance.get<ApiResponse<JobPosting[]>>(
    '/job-postings/viewed',
    { params },
  );
  return data.data;
};
