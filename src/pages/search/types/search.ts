// 검색 결과 행의 화면용 데이터예요.
export interface SearchResult {
  id: number;
  matchCount: number;
  deadline: string;
  matchedKeywords: string;
  title: string;
  meta: string;
  companyName: string;
  companyMeta: string;
  isBookmarked: boolean;
}

// 기업정보 영역의 화면용 데이터예요.
export interface CompanyFact {
  label: string;
  value: string;
}

export interface CompanyPosition {
  title: string;
  condition: string;
  deadline: string;
}

export interface CompanyInfo {
  name: string;
  factColumns: CompanyFact[][];
  positions: CompanyPosition[];
}

// 파워링크 광고예요. title의 홀수 번째 조각은 검색어와 겹치는 강조 문구예요.
export interface PowerLink {
  title: string[];
  url: string;
  description: string;
}

// 검색 공고 요청이에요. keywords는 타입만 두고, 이번 조회에는 보내지 않아요.
export interface SearchJobPostingParams {
  query?: string;
  keywords?: string[];
  page?: number;
  size?: number;
}

// 검색 공고 응답의 공고 한 건이에요.
export interface SearchJobPostingResponse {
  id: number;
  title: string;
  companyName: string;
  companyAddress: string;
  minCareerYears: number;
  maxCareerYears: number;
  requiredEducation: string;
  hireType: string;
  deadlineType: string;
  deadlineAt: string | null;
  ranking: number;
  keywords: string[];
  matchedKeywords: string[];
  totalKeywordCount: number;
}
