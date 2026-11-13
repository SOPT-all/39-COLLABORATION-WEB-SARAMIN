// 경력 연차를 화면용 문자열로 바꿔요.
// (0, 0) → '신입' / (0, 3) → '신입~3년' / (2, 2) → '2년' / (1, 3) → '1~3년'
export const convertCareerYears = (
  minCareerYears: number,
  maxCareerYears: number,
) => {
  if (maxCareerYears === 0) return '신입';
  if (minCareerYears === 0) return `신입~${maxCareerYears}년`;
  if (minCareerYears === maxCareerYears) return `${minCareerYears}년`;
  return `${minCareerYears}~${maxCareerYears}년`;
};
