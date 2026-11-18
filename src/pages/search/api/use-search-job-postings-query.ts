import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getSearchJobPostings } from '@/pages/search/api/get-search-job-postings';
import type { SearchJobPostingParams } from '@/pages/search/types/search';
import { QUERY_KEYS } from '@/shared/constants/query-keys';

// /api/v1/job-postings/search 요청 쿼리 훅
export const useSearchJobPostingsQuery = (
  params: SearchJobPostingParams,
  isEnabled = true,
) => {
  return useQuery({
    queryKey: QUERY_KEYS.JOB_POSTING.search(params),
    queryFn: async () => {
      const data = await getSearchJobPostings(params);
      // 이전 결과를 유지할 때도 해당 결과를 조회한 조건의 개수를 사용해요.
      return { ...data, keywordCount: params.keywords?.length ?? 0 };
    },
    placeholderData: keepPreviousData,
    enabled: isEnabled && Boolean(params.query?.trim()),
  });
};
