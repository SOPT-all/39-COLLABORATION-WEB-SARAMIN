import type {
  SearchJobPostingParams,
  SearchJobPostingResponse,
} from '@/pages/search/types/search';
import { axiosInstance } from '@/shared/api/config/axios-instance';
import type { ApiResponse, PageResponse } from '@/shared/types/api';

// /api/v1/job-postings/search 요청
export const getSearchJobPostings = async (params: SearchJobPostingParams) => {
  const { data } = await axiosInstance.get<
    ApiResponse<PageResponse<SearchJobPostingResponse>>
  >('/job-postings/search', {
    params,
  });

  return data.data;
};
