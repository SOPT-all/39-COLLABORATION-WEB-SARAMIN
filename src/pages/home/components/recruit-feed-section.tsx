import { useState } from 'react';
import type { UseQueryResult } from '@tanstack/react-query';

import { useDeadlineSoonJobPostingsQuery } from '@/pages/home/api/use-deadline-soon-job-postings-query';
import { useRecommendedJobPostingsQuery } from '@/pages/home/api/use-recommended-job-postings-query';
import { useViewedJobPostingsQuery } from '@/pages/home/api/use-viewed-job-postings-query';
import RecruitCardList from '@/pages/home/components/recruit-card-list';
import RecruitSectionHeading from '@/pages/home/components/recruit-section-heading';
import { RECRUIT_SECTIONS } from '@/pages/home/constants/recruit-sections';
import type { JobCardItem } from '@/pages/home/types/job-card';
import type {
  JobPosting,
  JobPostingListParams,
} from '@/pages/home/types/job-posting';
import type {
  ApplyFilter,
  RecruitSectionType,
} from '@/pages/home/types/recruit';
import { convertJobPostingToCardItem } from '@/pages/home/utils/convert-job-posting-to-card-item';

// 조회한 공고는 카드 두 줄(4개), 마감 임박 공고, 추천공고는 한 줄(2개)까지 보여 줘요.
const VIEWED_PARAMS: JobPostingListParams = { size: 4 };
const DEADLINE_SOON_PARAMS: JobPostingListParams = { size: 2 };
const RECOMMENDED_PARAMS: JobPostingListParams = { size: 2 };

interface SectionContent {
  recruits: JobCardItem[];
  isPending: boolean;
  isError: boolean;
  onRetry?: () => void;
}

// 공고 목록 쿼리 결과를 섹션 카드 목록 값으로 바꿔요.
const convertQueryToContent = (
  query: UseQueryResult<JobPosting[]>,
): SectionContent => ({
  recruits: (query.data ?? []).map((jobPosting) =>
    convertJobPostingToCardItem(jobPosting),
  ),
  isPending: query.isPending,
  isError: query.isError,
  onRetry: () => void query.refetch(),
});

interface DragOverTarget {
  type: RecruitSectionType;
  recruitId: number;
}

interface RecruitFeedSectionProps {
  selectedFilter: ApplyFilter | null;
  isDragging: boolean;
  // 이번 방문에서 지원을 마친 공고 id와 지원 시각이에요. 지원 API가 없어서 화면에서만 지원 완료로 바꿔요.
  appliedAtByRecruitId: ReadonlyMap<number, string>;
  onApplyDrop: (recruit: JobCardItem) => void;
}

const RecruitFeedSection = ({
  selectedFilter,
  isDragging,
  appliedAtByRecruitId,
  onApplyDrop,
}: RecruitFeedSectionProps) => {
  // 같은 공고가 여러 섹션에 나올 수 있어서 섹션까지 같이 기억해요.
  const [dragOverTarget, setDragOverTarget] = useState<DragOverTarget | null>(
    null,
  );

  const viewedQuery = useViewedJobPostingsQuery(VIEWED_PARAMS);
  const deadlineSoonQuery =
    useDeadlineSoonJobPostingsQuery(DEADLINE_SOON_PARAMS);
  const recommendedQuery = useRecommendedJobPostingsQuery(RECOMMENDED_PARAMS);

  // 조회한 공고 · 마감 임박 ·  추천 공고 모두 API 데이터를 사용해요.
  const getSectionContent = (type: RecruitSectionType): SectionContent => {
    if (type === 'viewedCompanies') return convertQueryToContent(viewedQuery);
    if (type === 'closingSoon') return convertQueryToContent(deadlineSoonQuery);

    return {
      recruits: (recommendedQuery.data?.jobPostings ?? []).map((jobPosting) =>
        convertJobPostingToCardItem(jobPosting),
      ),
      isPending: recommendedQuery.isPending,
      isError: recommendedQuery.isError,
      onRetry: () => void recommendedQuery.refetch(),
    };
  };

  return (
    <>
      {RECRUIT_SECTIONS.map(
        ({ type, hasCount, emptyTitle, emptyDescription, ...heading }) => {
          const {
            recruits: sectionRecruits,
            isPending,
            isError,
            onRetry,
          } = getSectionContent(type);
          const recruits = sectionRecruits.map((recruit) => {
            const appliedAt = appliedAtByRecruitId.get(recruit.id);
            return appliedAt
              ? { ...recruit, applyStatus: 'applied' as const, appliedAt }
              : recruit;
          });
          const isLoaded = !isPending && !isError;
          const filteredRecruits = recruits.filter(
            ({ applyStatus }) =>
              !selectedFilter || applyStatus === selectedFilter,
          );

          return (
            <section key={type} className="flex flex-col gap-6">
              <RecruitSectionHeading
                {...heading}
                description={
                  hasCount && isLoaded
                    ? `${heading.description} · ${recruits.length}개`
                    : heading.description
                }
              />
              <RecruitCardList
                recruits={filteredRecruits}
                isPending={isPending}
                isError={isError}
                isEmpty={isLoaded && recruits.length === 0}
                emptyTitle={emptyTitle}
                emptyDescription={emptyDescription}
                onRetry={onRetry}
                isDragging={isDragging}
                dragOverId={
                  isDragging && dragOverTarget?.type === type
                    ? dragOverTarget.recruitId
                    : null
                }
                onDragOverChange={(recruitId) =>
                  setDragOverTarget(
                    recruitId === null ? null : { type, recruitId },
                  )
                }
                onApplyDrop={onApplyDrop}
              />
            </section>
          );
        },
      )}
    </>
  );
};

export default RecruitFeedSection;
