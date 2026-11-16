import RecruitSectionHeading from '@/pages/home/components/recruit-section-heading';
import { MOCK_RECRUITS } from '@/pages/home/constants/mock-recruits';
import { RECRUIT_SECTIONS } from '@/pages/home/constants/recruit-sections';
import type { ApplyFilter } from '@/pages/home/types/recruit';
import CardJob from '@/shared/components/card-job/card-job';
import type { CardJobTag } from '@/shared/components/card-job/card-job.types';
import DropZoneApplication from '@/shared/components/drop-zone/drop-zone-application';

// 목데이터의 지원상태를 CardJob 상태로 변환
const CARD_JOB_STATE_MAP = {
  ready: 'default',
  needsDocuments: 'needs_document',
  external: 'external',
  applied: 'applied',
  closed: 'closed',
} as const;

// 목데이터의 지원상태를 DropZoneApplication 상태로 변환
const DROP_ZONE_STATUS_MAP = {
  ready: 'idle',
  needsDocuments: 'needsDocument',
  external: 'external',
  applied: 'applied',
  closed: 'closed',
} as const;

interface RecruitDisplayInfo {
  companyBadge?: string;
  benefit?: string;
  updated?: string;
  tagVariants: CardJobTag['variant'][];
}

// 임시 데이터

const RECRUIT_DISPLAY_INFO: Record<number, RecruitDisplayInfo> = {
  1: {
    companyBadge: '기업인증',
    benefit: '대졸↑ · 유연근무 · 점심 지원',
    updated: '2일 전 등록',
    tagVariants: ['role', 'skill', 'benefit'],
  },
  2: {
    companyBadge: '기업인증',
    benefit: '학력무관 · 주 2회 재택 · 선택근무',
    updated: '오늘',
    tagVariants: ['role', 'skill', 'benefit'],
  },
  3: {
    benefit: '학력무관 · 주 2회 재택',
    updated: '3시간 전',
    tagVariants: ['role', 'skill'],
  },
  4: {
    companyBadge: '기업인증',
    benefit: '대졸↑ · B2B 제품 경험 우대',
    updated: '어제',
    tagVariants: ['role', 'skill', 'benefit'],
  },
  5: {
    benefit: '학력무관 · 자율출퇴근',
    updated: '10.31 지원',
    tagVariants: ['role', 'skill', 'benefit'],
  },
  6: {
    benefit: '학력무관 · 자율출퇴근 · 장비 지원',
    updated: '오늘',
    tagVariants: ['role', 'skill'],
  },
  7: {
    companyBadge: '기업인증',
    benefit: '대졸↑ · 재택 혼합 · 선택근무',
    updated: '1시간 전',
    tagVariants: ['role', 'skill', 'benefit'],
  },
  8: {
    benefit: '대졸↑ · 합격축하금 50만원',
    updated: '4시간 전',
    tagVariants: ['role', 'skill'],
  },
};

interface RecruitFeedSectionProps {
  selectedFilter: ApplyFilter | null;
}

const RecruitFeedSection = ({ selectedFilter }: RecruitFeedSectionProps) => {
  return (
    <>
      {RECRUIT_SECTIONS.map(({ type, ...heading }) => {
        // 섹션별 목 데이터 조회 및 선택된 필터 적용
        const recruits = MOCK_RECRUITS[type].filter(
          ({ applyStatus }) =>
            !selectedFilter || applyStatus === selectedFilter,
        );

        return (
          <section key={type} className="flex flex-col gap-6">
            <RecruitSectionHeading {...heading} />

            <ul className="grid grid-cols-2 gap-4">
              {recruits.map((recruit) => {
                const displayInfo = RECRUIT_DISPLAY_INFO[recruit.id];

                return (
                  <li key={recruit.id}>
                    <CardJob
                      company={recruit.companyName}
                      jobTitle={recruit.title}
                      // TODO: API 및 로고 에셋 확인 후 실제 기업 로고 연결
                      logo={
                        <div className="flex h-full w-full items-center justify-center rounded-lg bg-surface-subtle text-label-12 text-text-secondary">
                          {recruit.companyName.charAt(0)}
                        </div>
                      }
                      companyBadge={displayInfo?.companyBadge}
                      tags={recruit.tags.map((tag, index) => ({
                        id: `${recruit.id}-${tag}`,
                        label: tag,
                        variant: displayInfo?.tagVariants[index] ?? 'skill',
                      }))}
                      conditions={recruit.conditions.join(' · ')}
                      benefit={displayInfo?.benefit}
                      matchReason={`내 조건 ${recruit.matchedConditionCount}개 일치`}
                      deadline={recruit.deadline}
                      updated={displayInfo?.updated ?? ''}
                      isBookmarked={recruit.isBookmarked}
                      state={CARD_JOB_STATE_MAP[recruit.applyStatus]}
                      applicationSlot={
                        <DropZoneApplication
                          status={DROP_ZONE_STATUS_MAP[recruit.applyStatus]}
                        />
                      }

                      // 북마크 기능 연결 전 임시 처리
                      onBookmarkChange={() => {}}

                      //상세보기 기능 연결 전 임시 처리
                      onViewDetail={() => {}}
                    />
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </>
  );
};

export default RecruitFeedSection;
