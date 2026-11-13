const MS_PER_DAY = 24 * 60 * 60 * 1000;

// 날짜만 남겨요. (시각 차이 때문에 D-day가 하루 밀리지 않게)
const getStartOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

// 마감일을 화면용 D-day로 바꿔요.
// '2026-11-18T23:59:59' → 'D-4' / 오늘 마감 → 'D-Day' / 지남 → '마감' / null(채용 시 마감) → '채용시'
export const convertDeadlineToDday = (
  deadlineAt: string | null,
  today: Date = new Date(),
) => {
  if (!deadlineAt) return '채용시';

  const remainingDays = Math.round(
    (getStartOfDay(new Date(deadlineAt)).getTime() -
      getStartOfDay(today).getTime()) /
      MS_PER_DAY,
  );

  if (remainingDays < 0) return '마감';
  if (remainingDays === 0) return 'D-Day';
  return `D-${remainingDays}`;
};
