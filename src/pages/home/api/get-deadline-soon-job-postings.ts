import type {
  JobPosting,
  JobPostingListParams,
} from '@/pages/home/types/job-posting';
import { axiosInstance } from '@/shared/api/config/axios-instance';
import type { ApiResponse } from '@/shared/types/api';

// 모집 중인 공고를 마감일이 가까운 순으로 size개까지 가져와요. (채용 시 마감은 제외)
export const getDeadlineSoonJobPostings = async (
  params?: JobPostingListParams,
) => {
  const { data } = await axiosInstance.get<ApiResponse<JobPosting[]>>(
    '/job-postings/deadline-soon',
    { params },
  );
  return data.data;
};
