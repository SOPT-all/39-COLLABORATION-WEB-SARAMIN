// 스크랩 공고 비교 모달의 공고 한 열이에요. 홈 · 검색 공고를 스크랩할 때 이 모양으로 담아 둬요.
export interface CompareJob {
  id: number;
  companyName: string;
  title: string;
  deadline: string;
  region: string;
  career: string;
  education: string;
  hireType: string;
  // MY FIT 일치 정보. 홈 공고는 일치 키워드 목록 · 전체 수가 없어 개수만 있어요.
  matchCount: number;
  totalKeywordCount: number | null;
  matchedKeywords: string[];
}
