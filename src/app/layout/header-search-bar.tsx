import {
  type FocusEvent,
  type FormEvent,
  type KeyboardEvent,
  useState,
} from 'react';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router';

import { useMyKeywordsQuery } from '@/shared/api/use-my-keywords-query';
import SearchGlobal from '@/shared/components/search/search-global';
import SearchSuggestionPanel, {
  type SearchSuggestion,
} from '@/shared/components/search/search-suggestion-panel';
import { KEYWORD_CANDIDATE_GROUPS } from '@/shared/constants/keyword-candidates';
import { ROUTES } from '@/shared/constants/routes';
import {
  SEARCH_KEYWORD_MAX_LENGTH,
  SEARCH_KEYWORD_PARAM,
} from '@/shared/constants/search';
import { useRecentSearches } from '@/shared/hooks/use-recent-searches';
import { moveFocusByArrowKey } from '@/shared/utils/move-focus-by-arrow-key';

// 패널 한 칸에 보여 줄 추천 검색어 수 (피그마 panel_search_suggestion 4줄)
const MAX_SUGGESTIONS = 4;
const ALL_CANDIDATES = KEYWORD_CANDIDATE_GROUPS.flatMap(
  ({ keywords }) => keywords,
);

const normalize = (value: string) => value.trim().toLowerCase();

// 입력 중이면 최근 검색어 · 키워드 후보에서 입력이 들어간 것을 자동완성으로 보여 줘요.
const getPredictiveSuggestions = (
  query: string,
  recentSearches: string[],
): SearchSuggestion[] => {
  const keyword = normalize(query);
  const recent = recentSearches
    .filter((search) => normalize(search).includes(keyword))
    .map((search) => ({ keyword: search, supportingText: '최근 검색' }));
  const predictive = ALL_CANDIDATES.filter(
    (candidate) =>
      normalize(candidate).includes(keyword) &&
      !recentSearches.some(
        (search) => normalize(search) === normalize(candidate),
      ),
  ).map((candidate) => ({ keyword: candidate, supportingText: '자동완성' }));

  return [...recent, ...predictive].slice(0, MAX_SUGGESTIONS);
};

// 검색하면 /search?keyword=검색어로 이동해요.
// 검색창에 포커스하면 아래에 추천 검색어 패널(피그마 panel_search_suggestion)을 띄워요. (디자인 QA)
// 비어 있을 때 → 최근 검색어 (없으면 내 키워드를 연관 검색어로) / 입력 중 → 자동완성
// 검색 화면에서 지금 검색어를 그대로 두고 포커스하면, 이미 검색한 단어라 최근 검색어(지금 검색어 제외)를 보여 줘요.
// ↑ ↓ 로 항목을 오가고 ESC · 바깥 클릭으로 닫아요. 입력창에 포커스할 때만 열려요. (AI 검색 버튼 제외)
const HeaderSearchBar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentKeyword = searchParams.get(SEARCH_KEYWORD_PARAM) ?? '';
  const [query, setQuery] = useState(currentKeyword);
  const [previousKeyword, setPreviousKeyword] = useState(currentKeyword);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const { recentSearches, addRecentSearch, removeRecentSearch } =
    useRecentSearches();
  const { data: myKeywords = [] } = useMyKeywordsQuery();

  // 다른 검색어로 이동하면 입력값을 새 검색어로 맞춰요.
  if (currentKeyword !== previousKeyword) {
    setPreviousKeyword(currentKeyword);
    setQuery(currentKeyword);
  }

  const search = (keyword: string) => {
    setIsPanelOpen(false);
    addRecentSearch(keyword);
    navigate({
      pathname: ROUTES.SEARCH,
      search: createSearchParams({
        [SEARCH_KEYWORD_PARAM]: keyword,
      }).toString(),
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const keyword = query.trim();
    if (!keyword) return;
    search(keyword);
  };

  const handleQueryChange = (nextQuery: string) => {
    setQuery(nextQuery);
    setIsPanelOpen(true);
  };

  const handleSuggestionSelect = (keyword: string) => {
    setQuery(keyword);
    search(keyword);
  };

  // 패널 안 버튼(최근 검색어 삭제 등)으로 포커스가 옮겨 가도 닫지 않아요.
  const handleBlur = (e: FocusEvent<HTMLFormElement>) => {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    setIsPanelOpen(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Escape') {
      // 추천 항목에 포커스가 있었으면 입력창으로 돌려놓고 닫아요.
      if (isPanelOpen) e.currentTarget.querySelector('input')?.focus();
      setIsPanelOpen(false);
      return;
    }
    if (isPanelOpen) {
      // 줄 단위로 이동해요. (최근 검색어의 X 삭제 버튼은 건너뛰어요)
      moveFocusByArrowKey(
        e,
        '[aria-label="추천 검색어"] button:not([aria-label$=" 삭제"])',
      );
    }
  };

  // 입력창에 포커스할 때만 패널을 열어요. (AI 검색 버튼을 눌렀을 때는 열지 않아요)
  const handleFocus = (e: FocusEvent<HTMLFormElement>) => {
    if (e.target instanceof HTMLInputElement) setIsPanelOpen(true);
  };

  const renderPanel = () => {
    if (!isPanelOpen) return null;

    const trimmedQuery = query.trim();
    // 검색 화면에서 지금 검색어를 그대로 둔 상태는 입력 중으로 보지 않아요.
    const isTyping = trimmedQuery.length > 0 && trimmedQuery !== currentKeyword;
    const suggestions = isTyping
      ? getPredictiveSuggestions(query, recentSearches)
      : recentSearches
          .filter((search) => search !== currentKeyword)
          .map((search) => ({
            keyword: search,
            supportingText: '최근 검색',
          }));
    const relatedSuggestions = myKeywords
      .filter(({ name }) => name !== currentKeyword)
      .slice(0, MAX_SUGGESTIONS)
      .map(({ name }) => ({ keyword: name, supportingText: '내 키워드' }));

    // 입력 중인데 맞는 검색어가 없으면 패널을 띄우지 않아요. Enter로 그대로 검색해요.
    if (isTyping && suggestions.length === 0) return null;
    // 최근 검색어가 없으면 내 키워드를 연관 검색어로 보여 줘요.
    const isRelated = !isTyping && suggestions.length === 0;
    if (isRelated && relatedSuggestions.length === 0) return null;

    return (
      <SearchSuggestionPanel
        aria-label="추천 검색어"
        contentState={
          isTyping ? 'predictive' : isRelated ? 'related' : 'recent'
        }
        suggestions={isRelated ? relatedSuggestions : suggestions}
        className="absolute top-full left-0 z-20 mt-2 h-auto shadow-card"
        // 사파리는 버튼을 눌러도 포커스가 가지 않아, 누르는 순간 검색창 포커스가 빠지지 않게 막아요.
        onMouseDown={(e) => e.preventDefault()}
        onSelect={handleSuggestionSelect}
        onRemove={removeRecentSearch}
      />
    );
  };

  return (
    <form
      role="search"
      className="relative w-140"
      onSubmit={handleSubmit}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      {/* TODO: AI 검색 버튼의 동작이 정해지면 onAiSearch를 연결해요. 현재 검색 이동은 Enter로 처리해요. */}
      <SearchGlobal
        query={query}
        placeholder="공채는 역시, 사람인"
        maxLength={SEARCH_KEYWORD_MAX_LENGTH}
        state={query ? 'typing' : 'default'}
        onQueryChange={handleQueryChange}
      />
      {renderPanel()}
    </form>
  );
};

export default HeaderSearchBar;
