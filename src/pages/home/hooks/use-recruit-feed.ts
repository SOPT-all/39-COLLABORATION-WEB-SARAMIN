import type { UseQueryResult } from '@tanstack/react-query';

import { useDeadlineSoonJobPostingsQuery } from '@/pages/home/api/use-deadline-soon-job-postings-query';
import { useRecommendedJobPostingsQuery } from '@/pages/home/api/use-recommended-job-postings-query';
import { useViewedJobPostingsQuery } from '@/pages/home/api/use-viewed-job-postings-query';
import type { JobCardItem } from '@/pages/home/types/job-card';
import type {
  JobPosting,
  JobPostingListParams,
} from '@/pages/home/types/job-posting';
import type { RecruitSectionType } from '@/pages/home/types/recruit';
import { convertJobPostingToCardItem } from '@/pages/home/utils/convert-job-posting-to-card-item';

// 조회한 공고는 카드 두 줄(4개), 추천 공고는 한 줄(2개)까지 보여 줘요.
const VIEWED_PARAMS: JobPostingListParams = { size: 4 };
const RECOMMENDED_PARAMS: JobPostingListParams = { size: 2 };
// 마감 임박은 전체보기가 없어서 48시간 안 공고를 전부 보여 줘요.
const DEADLINE_SOON_PARAMS: JobPostingListParams = { size: 50 };
const CLOSING_SOON_HOURS = 48;
const MS_PER_HOUR = 60 * 60 * 1000;

// 마감일이 지금부터 48시간 안인 공고만 남겨요. '채용 시 마감'(deadlineAt null)은 빠져요.
const selectClosingSoon = (jobPostings: JobPosting[]) => {
  const now = Date.now();
  return jobPostings.filter(({ deadlineAt }) => {
    if (!deadlineAt) return false;
    const remainingMs = new Date(deadlineAt).getTime() - now;
    return remainingMs > 0 && remainingMs <= CLOSING_SOON_HOURS * MS_PER_HOUR;
  });
};

export interface RecruitSectionContent {
  recruits: JobCardItem[];
  isPending: boolean;
  isError: boolean;
  onRetry: () => void;
}

// 공고 목록 쿼리 결과를 섹션 카드 목록 값으로 바꿔요.
// 이번 방문에서 지원을 마친 공고는 지원 API가 없어서 화면에서만 지원 완료로 바꿔요.
const convertQueryToContent = (
  query: UseQueryResult<unknown>,
  jobPostings: JobPosting[] | undefined,
  appliedAtByRecruitId: ReadonlyMap<number, string>,
): RecruitSectionContent => ({
  recruits: (jobPostings ?? []).map((jobPosting) => {
    const recruit = convertJobPostingToCardItem(jobPosting);
    const appliedAt = appliedAtByRecruitId.get(recruit.id);
    return appliedAt
      ? { ...recruit, applyStatus: 'applied' as const, appliedAt }
      : recruit;
  }),
  isPending: query.isPending,
  isError: query.isError,
  onRetry: () => void query.refetch(),
});

// 홈 공고 피드 섹션별 카드 목록이에요. 피드와 지원 필터 바 개수가 같은 값을 써요.
export const useRecruitFeed = (
  appliedAtByRecruitId: ReadonlyMap<number, string>,
): Record<RecruitSectionType, RecruitSectionContent> => {
  const viewedQuery = useViewedJobPostingsQuery(VIEWED_PARAMS);
  const deadlineSoonQuery = useDeadlineSoonJobPostingsQuery(
    DEADLINE_SOON_PARAMS,
    selectClosingSoon,
  );
  const recommendedQuery = useRecommendedJobPostingsQuery(RECOMMENDED_PARAMS);

  return {
    recommended: convertQueryToContent(
      recommendedQuery,
      recommendedQuery.data?.jobPostings,
      appliedAtByRecruitId,
    ),
    viewedCompanies: convertQueryToContent(
      viewedQuery,
      viewedQuery.data,
      appliedAtByRecruitId,
    ),
    closingSoon: convertQueryToContent(
      deadlineSoonQuery,
      deadlineSoonQuery.data,
      appliedAtByRecruitId,
    ),
  };
};
