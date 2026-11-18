// 스크랩 공고 비교 모달의 공고 한 열이에요. 홈 · 검색 공고를 스크랩할 때 이 모양으로 담아 둬요.
export interface CompareJob {
  id: number;
  companyName: string;
  title: string;
  deadline: string;
  // 상세보기에 보여 줄 마감 일시 원문('채용 시 마감'이면 null)과 전체 주소
  deadlineAt: string | null;
  address: string;
  region: string;
  career: string;
  education: string;
  hireType: string;
  // 공고 키워드. 일치 키워드 목록이 없는 홈 공고는 내 MY FIT 키워드와 겹치는 키워드로 일치 칩을 그려요.
  keywords: string[];
  // MY FIT 일치 정보. 일치 n / 공고 키워드 m
  matchCount: number;
  totalKeywordCount: number;
  // 일치 키워드 목록. 홈 공고는 응답에 없어서 null이에요.
  matchedKeywords: string[] | null;
}
