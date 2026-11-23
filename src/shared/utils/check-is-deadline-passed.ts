// 마감 일시가 지났는지 검사해요. '채용 시 마감'(null)은 지나지 않은 것으로 봐요.
// 서버가 마감일이 지난 공고를 '모집 중'으로 줄 때가 있어, 화면에서 한 번 더 걸러요.
export const checkIsDeadlinePassed = (
  deadlineAt: string | null,
  now: Date = new Date(),
) => {
  if (!deadlineAt) return false;
  return new Date(deadlineAt).getTime() < now.getTime();
};
