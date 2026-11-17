import type { JobCardItem } from '@/pages/home/types/job-card';
import { convertDateToMonthDay } from '@/pages/home/utils/convert-date-to-month-day';
import type { DropZoneApplicationStatus } from '@/shared/components/drop-zone/drop-zone-application-states';

interface DropZoneTexts {
  statusTitle?: string;
  statusDescription?: string;
  badge?: string;
}

const padTwoDigits = (value: number) => String(value).padStart(2, '0');

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

// 지원 시각을 뱃지 문구로 바꿔요. 오늘 → '오늘 15:00' / 다른 날 → '11.07 15:00'
const convertAppliedAtToLabel = (appliedAt: string, today: Date) => {
  const date = new Date(appliedAt);
  const time = `${padTwoDigits(date.getHours())}:${padTwoDigits(date.getMinutes())}`;

  return isSameDay(date, today)
    ? `오늘 ${time}`
    : `${convertDateToMonthDay(date)} ${time}`;
};

// 드롭 영역에서 공고마다 달라지는 문구를 만들어요.
// 값이 없는 문구는 DropZoneApplication이 상태 표의 피그마 문구로 그려요.
export const getDropZoneTexts = (
  { documents, appliedAt }: Pick<JobCardItem, 'documents' | 'appliedAt'>,
  status: DropZoneApplicationStatus,
  today: Date = new Date(),
): DropZoneTexts => {
  if (status === 'applied') {
    return appliedAt
      ? { badge: convertAppliedAtToLabel(appliedAt, today) }
      : {};
  }

  if (!documents) return {};

  const { requiredCount, matchedCount, missingNames } = documents;
  const documentProgress = `${matchedCount}/${requiredCount}`;

  if (status === 'needsDocument') {
    return {
      statusTitle: `서류 ${requiredCount - matchedCount}개 필요`,
      statusDescription:
        missingNames.length > 0
          ? `${missingNames.join(' · ')} 추가`
          : undefined,
      badge: `준비 ${documentProgress}`,
    };
  }

  if (status === 'idle') {
    return {
      statusDescription: `지원 서류 ${requiredCount}종`,
      badge: `서류 ${documentProgress}`,
    };
  }

  if (status === 'dragReady') return { badge: `서류 ${documentProgress}` };

  return {};
};
