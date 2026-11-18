import { useState } from 'react';

import RecruitCardList from '@/pages/home/components/recruit-card-list';
import RecruitSectionHeading from '@/pages/home/components/recruit-section-heading';
import { RECRUIT_SECTIONS } from '@/pages/home/constants/recruit-sections';
import type { RecruitSectionContent } from '@/pages/home/hooks/use-recruit-feed';
import type { JobCardItem } from '@/pages/home/types/job-card';
import type {
  ApplyFilter,
  RecruitSectionType,
} from '@/pages/home/types/recruit';

interface DragOverTarget {
  type: RecruitSectionType;
  recruitId: number;
}

interface RecruitFeedSectionProps {
  selectedFilter: ApplyFilter | null;
  isDragging: boolean;
  // 섹션별 카드 목록이에요. 지원 필터 바 개수와 같은 값을 쓰려고 홈에서 받아요.
  sections: Record<RecruitSectionType, RecruitSectionContent>;
  onApplyDrop: (recruit: JobCardItem) => void;
}

const RecruitFeedSection = ({
  selectedFilter,
  isDragging,
  sections,
  onApplyDrop,
}: RecruitFeedSectionProps) => {
  // 같은 공고가 여러 섹션에 나올 수 있어서 섹션까지 같이 기억해요.
  const [dragOverTarget, setDragOverTarget] = useState<DragOverTarget | null>(
    null,
  );

  return (
    <>
      {RECRUIT_SECTIONS.map(
        ({ type, hasCount, emptyTitle, emptyDescription, ...heading }) => {
          const { recruits, isPending, isError, onRetry } = sections[type];
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
