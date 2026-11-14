// 검색 결과 한 줄 (#47 RowSearchResult props 기준). API가 나오면 응답에 맞춰 조정해요.
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

// 기업정보 영역 (#47 ListCompanyFact · ListCompanyPosition props 기준)
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

// 파워링크 광고. title의 홀수 번째 조각은 검색어와 겹쳐서 강조해요.
export interface PowerLink {
  title: string[];
  url: string;
  description: string;
}
