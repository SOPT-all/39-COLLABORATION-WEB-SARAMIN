import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getRecommendedJobPostings } from '@/pages/home/api/get-recommended-job-postings';
import type { JobPostingListParams } from '@/pages/home/types/job-posting';
import { QUERY_KEYS } from '@/shared/constants/query-keys';

// 홈 추천 공고 섹션에서 사용
export const useRecommendedJobPostingsQuery = (
  params?: JobPostingListParams,
) => {
  return useQuery({
    queryKey: QUERY_KEYS.JOB_POSTING.recommended(params),
    queryFn: () => getRecommendedJobPostings(params),
    // 전체보기로 개수를 늘려 다시 받는 동안 이전 카드를 그대로 보여 줘요.
    placeholderData: keepPreviousData,
  });
};
