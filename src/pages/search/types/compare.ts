// 서버 공고 응답에 없는 비교 항목이에요. 목 데이터(MOCK_COMPARE_DETAILS)로 채워요.
export interface CompareJobDetail {
  schedule: string;
  salary: string;
  process: string;
  preference: string;
  // 비교 항목 편집에서 더할 수 있는 항목
  welfare: string;
  companySize: string;
  averageSalary: string;
  remoteWork: string;
  headcount: string;
}
