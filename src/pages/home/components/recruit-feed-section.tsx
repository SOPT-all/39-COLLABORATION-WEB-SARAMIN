import { useState } from 'react';

import RecruitCardList from '@/pages/home/components/recruit-card-list';
import RecruitSectionHeading from '@/pages/home/components/recruit-section-heading';
import { APPLY_FILTERS } from '@/pages/home/constants/apply-filters';
import { RECRUIT_SECTIONS } from '@/pages/home/constants/recruit-sections';
import type { RecruitSectionContent } from '@/pages/home/hooks/use-recruit-feed';
import type { JobCardItem } from '@/pages/home/types/job-card';
import type {
  ApplyFilter,
  RecruitSectionType,
} from '@/pages/home/types/recruit';

const FILTERED_EMPTY_DESCRIPTION =
  '다른 지원 상태를 고르거나 필터를 다시 눌러 전체 공고를 확인해 보세요.';

interface DragOverTarget {
  type: RecruitSectionType;
  recruitId: number;
}

interface RecruitFeedSectionProps {
  selectedFilter: ApplyFilter | null;
  isDragging: boolean;
  // 섹션별 카드 목록이에요. 지원 필터 바 개수와 같은 값을 쓰려고 홈에서 받아요.
  sections: Record<RecruitSectionType, RecruitSectionContent>;
  // 전체보기로 펼친 섹션과 펼치기 · 접기
  expandedSections: ReadonlySet<RecruitSectionType>;
  onToggleExpand: (type: RecruitSectionType) => void;
  onApplyDrop: (recruit: JobCardItem) => void;
}

const RecruitFeedSection = ({
  selectedFilter,
  isDragging,
  sections,
  expandedSections,
  onToggleExpand,
  onApplyDrop,
}: RecruitFeedSectionProps) => {
  // 같은 공고가 여러 섹션에 나올 수 있어서 섹션까지 같이 기억해요.
  const [dragOverTarget, setDragOverTarget] = useState<DragOverTarget | null>(
    null,
  );

  const selectedFilterLabel = APPLY_FILTERS.find(
    ({ value }) => value === selectedFilter,
  )?.label;

  return (
    <>
      {RECRUIT_SECTIONS.map(
        ({ type, hasCount, emptyTitle, emptyDescription, ...heading }) => {
          const { recruits, isPending, isError, onRetry } = sections[type];
          // 전체보기는 홈 안에서 섹션을 펼쳐요. (검색 화면 이동 아님, 기능명세서 FR-01)
          const canExpand = heading.actionVariant === 'viewAll';
          const isExpanded = expandedSections.has(type);
          const isLoaded = !isPending && !isError;
          const filteredRecruits = recruits.filter(
            ({ applyStatus }) =>
              !selectedFilter || applyStatus === selectedFilter,
          );
          // 공고는 있는데 고른 지원 상태에 맞는 공고가 없을 때는 필터 기준으로 안내해요.
          const isFilteredEmpty = recruits.length > 0 && selectedFilterLabel;

          return (
            <section key={type} className="flex flex-col gap-6">
              <RecruitSectionHeading
                {...heading}
                actionLabel={
                  canExpand && isExpanded ? '접기' : heading.actionLabel
                }
                isExpanded={canExpand ? isExpanded : undefined}
                onActionClick={
                  canExpand ? () => onToggleExpand(type) : undefined
                }
                description={
                  hasCount && isLoaded
                    ? `${heading.description} · ${filteredRecruits.length}개`
                    : heading.description
                }
              />
              <RecruitCardList
                recruits={filteredRecruits}
                isPending={isPending}
                isError={isError}
                isEmpty={isLoaded && filteredRecruits.length === 0}
                emptyTitle={
                  isFilteredEmpty
                    ? `‘${selectedFilterLabel}’ 공고가 없어요`
                    : emptyTitle
                }
                emptyDescription={
                  isFilteredEmpty
                    ? FILTERED_EMPTY_DESCRIPTION
                    : emptyDescription
                }
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
