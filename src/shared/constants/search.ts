// 검색 페이지 URL의 검색어 쿼리 이름 (/search?keyword=검색어)
export const SEARCH_KEYWORD_PARAM = 'keyword';

// 검색 결과 페이지 번호 쿼리 이름 (/search?keyword=검색어&page=2). 화면 번호와 같이 1부터, 1페이지는 생략해요.
export const SEARCH_PAGE_PARAM = 'page';

// 검색 API가 받는 검색어 최대 길이. 넘으면 서버가 400으로 응답해요.
export const SEARCH_KEYWORD_MAX_LENGTH = 100;
