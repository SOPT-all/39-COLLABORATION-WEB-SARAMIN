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
  const [prevKeyword, setPrevKeyword] = useState(currentKeyword);

  // 다른 검색어로 이동하면 입력값을 새 검색어로 맞춰요.
  if (currentKeyword !== prevKeyword) {
    setPrevKeyword(currentKeyword);
    setQuery(currentKeyword);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      <SearchGlobal
        query={query}
        placeholder="프로덕트 디자이너"
        state={query ? 'typing' : 'default'}
        errorMessage="일부 정보를 불러오지 못했습니다"
        onQueryChange={setQuery}
      />
    </form>
  );
};

export default HeaderSearchBar;
