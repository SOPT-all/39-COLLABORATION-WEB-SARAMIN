import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getViewedJobPostings } from '@/pages/home/api/get-viewed-job-postings';
import type { JobPostingListParams } from '@/pages/home/types/job-posting';
import { QUERY_KEYS } from '@/shared/constants/query-keys';

// 홈 조회한 공고 섹션에서 써요.
export const useViewedJobPostingsQuery = (params?: JobPostingListParams) => {
  return useQuery({
    queryKey: QUERY_KEYS.JOB_POSTING.viewed(params),
    queryFn: () => getViewedJobPostings(params),
    // 전체보기로 개수를 늘려 다시 받는 동안 이전 카드를 그대로 보여 줘요.
    placeholderData: keepPreviousData,
  });
};
