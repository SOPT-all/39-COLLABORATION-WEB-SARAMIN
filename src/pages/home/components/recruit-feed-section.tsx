import { useDeadlineSoonJobPostingsQuery } from '@/pages/home/api/use-deadline-soon-job-postings-query';
import RecruitCardList from '@/pages/home/components/recruit-card-list';
import RecruitSectionHeading from '@/pages/home/components/recruit-section-heading';
import { MOCK_RECRUITS } from '@/pages/home/constants/mock-recruits';
import { RECRUIT_SECTIONS } from '@/pages/home/constants/recruit-sections';
import type { JobCardItem } from '@/pages/home/types/job-card';
import type { JobPostingListParams } from '@/pages/home/types/job-posting';
import type {
  ApplyFilter,
  Recruit,
  RecruitSectionType,
} from '@/pages/home/types/recruit';
import { convertJobPostingToCardItem } from '@/pages/home/utils/convert-job-posting-to-card-item';
import type { CardJobTag } from '@/shared/components/card-job/card-job.types';

// 마감 임박 공고는 카드 두 줄(2개)까지 보여 줘요.
const DEADLINE_SOON_PARAMS: JobPostingListParams = { size: 2 };

interface RecruitDisplayInfo {
  companyBadge?: string;
  benefit?: string;
  updated?: string;
  tagVariants: CardJobTag['variant'][];
}

// 목 데이터에만 있는 표시 정보예요. 추천(#70) · 조회한 공고(#68)를 API로 바꾸면 지워요.
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

const convertMockRecruitToCardItem = (recruit: Recruit): JobCardItem => {
  const displayInfo = RECRUIT_DISPLAY_INFO[recruit.id];

  return {
    id: recruit.id,
    companyName: recruit.companyName,
    title: recruit.title,
    companyBadge: displayInfo?.companyBadge,
    tags: recruit.tags.map((tag, index) => ({
      id: `${recruit.id}-${tag}`,
      label: tag,
      variant: displayInfo?.tagVariants[index] ?? 'skill',
    })),
    conditions: recruit.conditions.join(' · '),
    benefit: displayInfo?.benefit,
    matchReason: `내 조건 ${recruit.matchedConditionCount}개 일치`,
    deadline: recruit.deadline,
    updated: displayInfo?.updated ?? '',
    applyStatus: recruit.applyStatus,
    isBookmarked: recruit.isBookmarked,
  };
};

interface SectionContent {
  recruits: JobCardItem[];
  isPending: boolean;
  isError: boolean;
  onRetry?: () => void;
}

interface RecruitFeedSectionProps {
  selectedFilter: ApplyFilter | null;
}

const RecruitFeedSection = ({ selectedFilter }: RecruitFeedSectionProps) => {
  const deadlineSoonQuery =
    useDeadlineSoonJobPostingsQuery(DEADLINE_SOON_PARAMS);

  // 마감 임박은 API, 나머지는 각 이슈에서 연결할 때까지 목 데이터를 써요.
  const getSectionContent = (type: RecruitSectionType): SectionContent => {
    if (type === 'closingSoon') {
      return {
        recruits: (deadlineSoonQuery.data ?? []).map((jobPosting) =>
          convertJobPostingToCardItem(jobPosting),
        ),
        isPending: deadlineSoonQuery.isPending,
        isError: deadlineSoonQuery.isError,
        onRetry: () => void deadlineSoonQuery.refetch(),
      };
    }

    return {
      recruits: MOCK_RECRUITS[type].map(convertMockRecruitToCardItem),
      isPending: false,
      isError: false,
    };
  };

  return (
    <>
      {RECRUIT_SECTIONS.map(
        ({ type, hasCount, emptyTitle, emptyDescription, ...heading }) => {
          const { recruits, isPending, isError, onRetry } =
            getSectionContent(type);
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
              />
            </section>
          );
        },
      )}
    </>
  );
};

export default RecruitFeedSection;
