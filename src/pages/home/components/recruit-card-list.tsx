import CompanyLogo from '@/pages/home/components/company-logo';
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

interface RecruitCardListProps {
  recruits: JobCardItem[];
  isPending?: boolean;
  isError?: boolean;
  // 응답 자체가 비었을 때만 true예요. 지원 필터로 다 걸러진 경우는 빈 목록만 그려요.
  isEmpty?: boolean;
  emptyTitle: string;
  emptyDescription: string;
  onRetry?: () => void;
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
      {recruits.map((recruit) => (
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
            state={CARD_JOB_STATE_MAP[recruit.applyStatus]}
            applicationSlot={
              <DropZoneApplication
                status={DROP_ZONE_STATUS_MAP[recruit.applyStatus]}
              />
            }
            // 북마크 기능 연결 전 임시 처리
            onBookmarkChange={() => {}}
            // 상세보기 기능 연결 전 임시 처리
            onViewDetail={() => {}}
          />
        </li>
      ))}
    </ul>
  );
};

export default RecruitCardList;
