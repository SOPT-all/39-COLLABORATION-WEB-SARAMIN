import type { SearchResult, SearchSort } from '@/pages/search/types/search';

// 마감일이 없는 공고(채용 시 마감)는 마감임박 비교에서 맨 뒤로 가요.
const getDeadlineTime = ({ deadlineAt }: SearchResult) =>
  deadlineAt ? new Date(deadlineAt).getTime() : Infinity;

const compareByDeadline = (a: SearchResult, b: SearchResult) =>
  getDeadlineTime(a) - getDeadlineTime(b);

const compareByMatch = (a: SearchResult, b: SearchResult) =>
  b.matchCount - a.matchCount;

// 검색 결과를 정렬해요. (기능명세서 FR-02)
// 매칭순: 일치 키워드 수 ↓, 같으면 마감 임박순
// 마감임박: 마감일 ↑ (채용 시 마감은 맨 뒤), 같으면 일치 키워드 수 ↓
// 서버 검색 API에 정렬 파라미터가 없어 받아 온 페이지 안에서 정렬해요.
export const sortSearchResults = (results: SearchResult[], sort: SearchSort) =>
  [...results].sort((a, b) =>
    sort === 'match'
      ? compareByMatch(a, b) || compareByDeadline(a, b)
      : compareByDeadline(a, b) || compareByMatch(a, b),
  );
