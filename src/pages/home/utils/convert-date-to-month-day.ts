// 날짜를 '월.일'로 바꿔요. '2026-10-31T15:00:00' → '10.31' / '2026-11-07T…' → '11.07'
export const convertDateToMonthDay = (date: Date) =>
  `${date.getMonth() + 1}.${String(date.getDate()).padStart(2, '0')}`;
