import { useQuery } from '@tanstack/react-query';

import { getDeadlineSoonJobPostings } from '@/pages/home/api/get-deadline-soon-job-postings';
import type {
  JobPosting,
  JobPostingListParams,
} from '@/pages/home/types/job-posting';
import { QUERY_KEYS } from '@/shared/constants/query-keys';

// 홈 마감 임박 공고 섹션에서 써요.
export const useDeadlineSoonJobPostingsQuery = (
  params?: JobPostingListParams,
  select?: (jobPostings: JobPosting[]) => JobPosting[],
) => {
  return useQuery({
    queryKey: QUERY_KEYS.JOB_POSTING.deadlineSoon(params),
    queryFn: () => getDeadlineSoonJobPostings(params),
    select,
  });
};
