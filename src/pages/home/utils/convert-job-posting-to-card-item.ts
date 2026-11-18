import type {
  JobCardDocuments,
  JobCardItem,
} from '@/pages/home/types/job-card';
import type { JobPosting } from '@/pages/home/types/job-posting';
import type { ApplyStatus } from '@/pages/home/types/recruit';
import { convertDateToMonthDay } from '@/pages/home/utils/convert-date-to-month-day';
import type { CardJobTag } from '@/shared/components/card-job/card-job.types';
import { convertAddressToRegion } from '@/shared/utils/convert-address-to-region';
import { convertCareerYears } from '@/shared/utils/convert-career-years';
import { convertDeadlineToDday } from '@/shared/utils/convert-deadline-to-dday';

const MAX_TAG_COUNT = 3;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

const getStartOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

// 서버에 외부 지원 여부가 없어서 마감 · 지원 완료 · 서류 부족 · 지원 가능 4가지로 나눠요.
const getApplyStatus = (jobPosting: JobPosting): ApplyStatus => {
  if (jobPosting.status === '모집 마감') return 'closed';
  if (jobPosting.applied) return 'applied';
  if (jobPosting.missingDocuments?.length) return 'needsDocuments';
  return 'ready';
};

// 첫 키워드는 직무, 나머지는 기술 태그로 보여 줘요.
const convertKeywordsToTags = (
  jobPostingId: number,
  keywords: string[],
): CardJobTag[] =>
  keywords.slice(0, MAX_TAG_COUNT).map((keyword, index) => ({
    id: `${jobPostingId}-${keyword}`,
    label: keyword,
    variant: index === 0 ? 'role' : 'skill',
  }));

// 서류 수가 null(지원한 공고)이면 서류 정보 없이 둬요.
const convertToDocuments = ({
  requiredDocumentCount,
  matchedDocumentCount,
  missingDocuments,
}: JobPosting): JobCardDocuments | undefined => {
  if (requiredDocumentCount === null || matchedDocumentCount === null) {
    return undefined;
  }

  return {
    requiredCount: requiredDocumentCount,
    matchedCount: matchedDocumentCount,
    missingNames: missingDocuments ?? [],
  };
};

// 지원한 공고는 지원일, 아니면 등록일을 보여 줘요.
// 지원 → '10.31 지원' / 등록 → '오늘' · '어제' · '3일 전 등록' / 값 없음 → ''
const convertToUpdatedLabel = (
  { appliedAt, postedAt }: JobPosting,
  today: Date,
) => {
  if (appliedAt) return `${convertDateToMonthDay(new Date(appliedAt))} 지원`;
  if (!postedAt) return '';

  const passedDays = Math.round(
    (getStartOfDay(today).getTime() -
      getStartOfDay(new Date(postedAt)).getTime()) /
      MS_PER_DAY,
  );

  if (passedDays <= 0) return '오늘';
  if (passedDays === 1) return '어제';
  return `${passedDays}일 전 등록`;
};

// 공고 API 응답 한 건을 홈 공고 카드 값으로 바꿔요. 추천 · 조회한 공고 · 마감 임박이 같이 써요.
export const convertJobPostingToCardItem = (
  jobPosting: JobPosting,
  today: Date = new Date(),
): JobCardItem => ({
  id: jobPosting.id,
  companyName: jobPosting.companyName,
  title: jobPosting.title,
  companyBadge: jobPosting.companyCertified ? '기업인증' : undefined,
  tags: convertKeywordsToTags(jobPosting.id, jobPosting.keywords),
  conditions: [
    convertAddressToRegion(jobPosting.companyAddress),
    convertCareerYears(jobPosting.minCareerYears, jobPosting.maxCareerYears),
    jobPosting.hireType,
  ].join(' · '),
  // 일치 키워드가 없으면 일치 줄을 그리지 않아요. (0개 일치에 체크 아이콘이 붙어 맞는 것처럼 보이지 않게)
  matchReason:
    jobPosting.matchedKeywordCount > 0
      ? `내 조건 ${jobPosting.matchedKeywordCount}개 일치`
      : '',
  deadline: convertDeadlineToDday(jobPosting.deadlineAt, today),
  updated: convertToUpdatedLabel(jobPosting, today),
  applyStatus: getApplyStatus(jobPosting),
  // 북마크 API가 없어서 항상 false예요.
  isBookmarked: false,
  documents: convertToDocuments(jobPosting),
  appliedAt: jobPosting.appliedAt ?? undefined,
  compareJob: {
    id: jobPosting.id,
    companyName: jobPosting.companyName,
    title: jobPosting.title,
    deadline: convertDeadlineToDday(jobPosting.deadlineAt, today),
    deadlineAt: jobPosting.deadlineAt,
    address: jobPosting.companyAddress,
    region: convertAddressToRegion(jobPosting.companyAddress),
    career: convertCareerYears(
      jobPosting.minCareerYears,
      jobPosting.maxCareerYears,
    ),
    education: jobPosting.requiredEducation,
    hireType: jobPosting.hireType,
    keywords: jobPosting.keywords,
    // 홈 공고 응답에는 일치 키워드 목록이 없어 비교 모달에서 내 키워드와 겹치는 키워드로 그려요.
    matchCount: jobPosting.matchedKeywordCount,
    totalKeywordCount: jobPosting.keywords.length,
    matchedKeywords: null,
  },
});
