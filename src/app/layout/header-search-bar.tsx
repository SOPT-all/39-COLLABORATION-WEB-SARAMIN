import type { FormEvent } from 'react';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router';

import { ROUTES } from '@/shared/constants/routes';
import { SEARCH_KEYWORD_PARAM } from '@/shared/constants/search';

import IcAiSpark from '@/shared/assets/icons/ic-ai-spark.svg?react';
import IcSearch from '@/shared/assets/icons/ic-search.svg?react';

// 검색하면 /search?keyword=검색어로 이동해요. 디자인은 검색 컴포넌트(#30)로 교체할 예정이에요.
const HeaderSearchBar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentKeyword = searchParams.get(SEARCH_KEYWORD_PARAM) ?? '';

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const keyword = new FormData(e.currentTarget)
      .get(SEARCH_KEYWORD_PARAM)
      ?.toString()
      .trim();
    if (!keyword) return;

    navigate({
      pathname: ROUTES.SEARCH,
      search: createSearchParams({
        [SEARCH_KEYWORD_PARAM]: keyword,
      }).toString(),
    });
  };

  return (
    <form
      role="search"
      className="flex h-11.5 w-140 items-center justify-between rounded-full border-2 border-blue-90 bg-surface-default px-4 py-1.5"
      onSubmit={handleSubmit}
    >
      <label className="flex items-center gap-2.5">
        <IcSearch aria-hidden className="shrink-0 text-gray-110" />
        <input
          // 다른 검색어로 이동하면 입력값을 새 검색어로 맞춰요.
          key={currentKeyword}
          type="search"
          name={SEARCH_KEYWORD_PARAM}
          aria-label="검색어 입력"
          placeholder="프로덕트 디자이너"
          defaultValue={currentKeyword}
          className="w-97.5 text-body-14 text-text-primary outline-none placeholder:text-text-secondary"
        />
      </label>
      <button
        type="button"
        className="flex h-7.5 w-23 items-center gap-1.5 rounded-[15px] bg-surface-blue-subtle p-1.5 text-label-14 text-blue-90"
      >
        <IcAiSpark aria-hidden className="shrink-0" />
        AI 검색
      </button>
    </form>
  );
};

export default HeaderSearchBar;
