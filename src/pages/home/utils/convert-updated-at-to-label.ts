const MINUTE_MS = 60 * 1000;
const HOUR_MS = 60 * MINUTE_MS;
const DAY_MS = 24 * HOUR_MS;

// 업데이트 시각을 '방금 전' · '10분 전' · '3시간 전' · '어제' · '3일 전'으로 바꿔요.
export const convertUpdatedAtToLabel = (
  updatedAt: string,
  now: Date = new Date(),
) => {
  const passedMs = now.getTime() - new Date(updatedAt).getTime();

  if (passedMs < MINUTE_MS) return '방금 전';
  if (passedMs < HOUR_MS) return `${Math.floor(passedMs / MINUTE_MS)}분 전`;
  if (passedMs < DAY_MS) return `${Math.floor(passedMs / HOUR_MS)}시간 전`;

  const passedDays = Math.floor(passedMs / DAY_MS);
  return passedDays === 1 ? '어제' : `${passedDays}일 전`;
};
