import RecruitSectionHeading from '@/pages/home/components/recruit-section-heading';
import { MOCK_RECRUITS } from '@/pages/home/constants/mock-recruits';
import { RECRUIT_SECTIONS } from '@/pages/home/constants/recruit-sections';
import type { ApplyFilter } from '@/pages/home/types/recruit';
import CardJob from '@/shared/components/card-job/card-job';
import type { CardJobTag } from '@/shared/components/card-job/card-job.types';
import DropZoneApplication from '@/shared/components/drop-zone/drop-zone-application';

import LogoDanggeun from '@/shared/assets/logo/logo_danggeun.svg';
import LogoHyundaiAutoever from '@/shared/assets/logo/logo_hyundai_autoever.svg';
import LogoKakaopay from '@/shared/assets/logo/logo_kakaopay.svg';
import LogoMusinsa from '@/shared/assets/logo/logo_musinsa.svg';
import LogoNaverCloud from '@/shared/assets/logo/logo_naver_cloud.svg';
import LogoOliveYoung from '@/shared/assets/logo/logo_olive_young.svg';
import LogoTodaysHome from '@/shared/assets/logo/logo_todays_home.svg';
import LogoToss from '@/shared/assets/logo/logo_toss.svg';

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

const COMPANY_LOGO_MAP: Record<number, string> = {
  1: LogoKakaopay,
  2: LogoMusinsa,
  3: LogoTodaysHome,
  4: LogoNaverCloud,
  5: LogoDanggeun,
  6: LogoToss,
  7: LogoHyundaiAutoever,
  8: LogoOliveYoung,
};

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
                      logo={
                        <img
                          src={COMPANY_LOGO_MAP[recruit.id]}
                          alt=""
                          className="size-8 rounded-lg"
                        />
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
