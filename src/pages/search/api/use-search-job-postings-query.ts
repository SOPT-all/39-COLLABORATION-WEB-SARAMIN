import { useQuery } from '@tanstack/react-query';

import { getSearchJobPostings } from '@/pages/search/api/get-search-job-postings';
import type { SearchJobPostingParams } from '@/pages/search/types/search';
import { QUERY_KEYS } from '@/shared/constants/query-keys';

// /api/v1/job-postings/search 요청 쿼리 훅
export const useSearchJobPostingsQuery = (params: SearchJobPostingParams) => {
  return useQuery({
    queryKey: QUERY_KEYS.JOB_POSTING.search(params),
    queryFn: () => getSearchJobPostings(params),
    enabled: Boolean(params.query?.trim()),
  });
};
