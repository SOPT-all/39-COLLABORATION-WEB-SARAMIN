import type { DragEvent } from 'react';

import CompanyLogo from '@/pages/home/components/company-logo';
import { APPLY_BUNDLE_DRAG_TYPE } from '@/pages/home/constants/apply-drag';
import type { JobCardItem } from '@/pages/home/types/job-card';
import CardJob from '@/shared/components/card-job/card-job';
import DropZoneApplication from '@/shared/components/drop-zone/drop-zone-application';
import SkeletonJobCard from '@/shared/components/skeleton/skeleton-job-card';
import StateMessage from '@/shared/components/state-message/state-message';

const LOADING_CARD_COUNT = 2;

// 지원 상태를 CardJob 상태로 변환
const CARD_JOB_STATE_MAP = {
  ready: 'default',
  needsDocuments: 'needs_document',
  external: 'external',
  applied: 'applied',
  closed: 'closed',
} as const;

// 지원 상태를 DropZoneApplication 상태로 변환
const DROP_ZONE_STATUS_MAP = {
  ready: 'idle',
  needsDocuments: 'needsDocument',
  external: 'external',
  applied: 'applied',
  closed: 'closed',
} as const;

// 지원 패키지를 끄는 동안 드롭할 수 있는 공고는 drag_ready, 위에 올리면 drag_over로 바꿔요.
const getDragStates = (isDragOver: boolean) =>
  isDragOver
    ? ({ card: 'drag_over', dropZone: 'dragOver' } as const)
    : ({ card: 'drag_ready', dropZone: 'dragReady' } as const);

const isBundleDrag = (e: DragEvent<HTMLElement>) =>
  e.dataTransfer.types.includes(APPLY_BUNDLE_DRAG_TYPE);

interface RecruitCardListProps {
  recruits: JobCardItem[];
  isPending?: boolean;
  isError?: boolean;
  // 응답 자체가 비었을 때만 true예요. 지원 필터로 다 걸러진 경우는 빈 목록만 그려요.
  isEmpty?: boolean;
  emptyTitle: string;
  emptyDescription: string;
  onRetry?: () => void;
  // 지원 패키지를 끄는 중인지, 지금 패키지가 올라가 있는 공고 id
  isDragging?: boolean;
  dragOverId?: number | null;
  onDragOverChange?: (recruitId: number | null) => void;
  onApplyDrop?: (recruit: JobCardItem) => void;
}

// 공고 피드 섹션 하나의 카드 목록이에요. 로딩 · 오류 · 빈 결과도 여기서 그려요.
const RecruitCardList = ({
  recruits,
  isPending = false,
  isError = false,
  isEmpty = false,
  emptyTitle,
  emptyDescription,
  onRetry,
  isDragging = false,
  dragOverId = null,
  onDragOverChange,
  onApplyDrop,
}: RecruitCardListProps) => {
  if (isPending) {
    return (
      <div aria-busy="true" className="grid grid-cols-2 gap-4">
        {Array.from({ length: LOADING_CARD_COUNT }, (_, index) => (
          <SkeletonJobCard key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <StateMessage
        kind="error"
        scope="section"
        title="공고를 불러오지 못했어요"
        description="잠시 후 다시 시도해 주세요."
        action={onRetry && { label: '다시 시도', onClick: onRetry }}
        className="w-full"
      />
    );
  }

  if (isEmpty) {
    return (
      <StateMessage
        kind="empty"
        scope="section"
        title={emptyTitle}
        description={emptyDescription}
        className="w-full"
      />
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-4">
      {recruits.map((recruit) => {
        // 바로 지원 가능한 공고에만 드롭할 수 있어요. (서류 부족 · 지원 완료 · 마감은 제외)
        const isDroppable = recruit.applyStatus === 'ready';
        const dragStates =
          isDragging && isDroppable
            ? getDragStates(dragOverId === recruit.id)
            : null;

        const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
          if (!isBundleDrag(e)) return;
          e.preventDefault();
          e.dataTransfer.dropEffect = 'copy';
          if (dragOverId !== recruit.id) onDragOverChange?.(recruit.id);
        };

        // 드롭 영역 안의 글자 · 아이콘으로 옮겨 갈 때는 나간 것으로 보지 않아요.
        const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
          if (e.currentTarget.contains(e.relatedTarget as Node | null)) return;
          if (dragOverId === recruit.id) onDragOverChange?.(null);
        };

        const handleDrop = (e: DragEvent<HTMLDivElement>) => {
          if (!isBundleDrag(e)) return;
          e.preventDefault();
          onDragOverChange?.(null);
          onApplyDrop?.(recruit);
        };

        return (
          <li key={recruit.id}>
            <CardJob
              company={recruit.companyName}
              jobTitle={recruit.title}
              logo={<CompanyLogo companyName={recruit.companyName} />}
              companyBadge={recruit.companyBadge}
              tags={recruit.tags}
              conditions={recruit.conditions}
              benefit={recruit.benefit}
              matchReason={recruit.matchReason}
              deadline={recruit.deadline}
              updated={recruit.updated}
              isBookmarked={recruit.isBookmarked}
              state={
                dragStates?.card ?? CARD_JOB_STATE_MAP[recruit.applyStatus]
              }
              applicationSlot={
                <DropZoneApplication
                  status={
                    dragStates?.dropZone ??
                    DROP_ZONE_STATUS_MAP[recruit.applyStatus]
                  }
                  {...(isDroppable && {
                    onDragOver: handleDragOver,
                    onDragLeave: handleDragLeave,
                    onDrop: handleDrop,
                  })}
                />
              }
              // 북마크 기능 연결 전 임시 처리
              onBookmarkChange={() => {}}
              // 상세보기 기능 연결 전 임시 처리
              onViewDetail={() => {}}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default RecruitCardList;
