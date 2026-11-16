import { type FormEvent, useState } from 'react';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router';

import SearchGlobal from '@/shared/components/search/search-global';
import { ROUTES } from '@/shared/constants/routes';
import { SEARCH_KEYWORD_PARAM } from '@/shared/constants/search';

// 검색하면 /search?keyword=검색어로 이동해요.
const HeaderSearchBar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentKeyword = searchParams.get(SEARCH_KEYWORD_PARAM) ?? '';
  const [query, setQuery] = useState(currentKeyword);
  const [previousKeyword, setPreviousKeyword] = useState(currentKeyword);

  // 다른 검색어로 이동하면 입력값을 새 검색어로 맞춰요.
  if (currentKeyword !== previousKeyword) {
    setPreviousKeyword(currentKeyword);
    setQuery(currentKeyword);
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const keyword = query.trim();
    if (!keyword) return;

    navigate({
      pathname: ROUTES.SEARCH,
      search: createSearchParams({
        [SEARCH_KEYWORD_PARAM]: keyword,
      }).toString(),
    });
  };

  return (
    <form role="search" className="w-140" onSubmit={handleSubmit}>
      {/* TODO: AI 검색 버튼의 동작이 정해지면 onAiSearch를 연결해요. 현재 검색 이동은 Enter로 처리해요. */}
      <SearchGlobal
        query={query}
        placeholder="프로덕트 디자이너"
        state={query ? 'typing' : 'default'}
        onQueryChange={setQuery}
      />
    </form>
  );
};

export default HeaderSearchBar;
