import { useNavigate } from 'react-router';

import { MOCK_RELATED_KEYWORDS } from '@/pages/search/constants/mock-search';
import ChipSelectedFilter from '@/shared/components/chip/chip-selected-filter';
import { ROUTES } from '@/shared/constants/routes';
import { cn } from '@/shared/utils/cn';

interface SearchSummaryProps {
  keyword: string;
  totalCount: number;
  isLoading: boolean;
  isError: boolean;
}

// 검색어 칩은 한 줄이라 긴 검색어는 앞부분만 보여 줘요.
const CHIP_KEYWORD_MAX_LENGTH = 30;

const SEARCH_TABS = ['통합검색', '✦ AI 검색', '채용정보', '기업정보'];

// 탭 전환은 아직 동작하지 않아요.

const SearchSummary = ({
  keyword,
  totalCount,
  isLoading,
  isError,
}: SearchSummaryProps) => {
  const navigate = useNavigate();
  const canShowTotalCount = !isLoading && !isError;
  const chipKeyword =
    keyword.length > CHIP_KEYWORD_MAX_LENGTH
      ? `${keyword.slice(0, CHIP_KEYWORD_MAX_LENGTH)}…`
      : keyword;
  return (
    <section aria-label="검색 요약" className="mx-auto w-315">
      <div className="flex h-18.5 items-center justify-between px-5">
        <div className="flex items-center gap-2">
          {/* 적용된 조건은 검색어뿐이라 검색어 칩만 보여 줘요. 지우면 검색어 없이 홈으로 돌아가요. */}
          <ChipSelectedFilter onRemove={() => navigate(ROUTES.HOME)}>
            {`검색어 · ${chipKeyword}`}
          </ChipSelectedFilter>
        </div>
        {canShowTotalCount && (
          <p className="flex h-10 w-47.5 items-center justify-center rounded-lg bg-surface-subtle text-title-16 text-text-primary">
            {totalCount.toLocaleString()}건 검색완료
          </p>
        )}
      </div>

      <div className="flex h-11 items-center gap-4 text-center text-body-14">
        <span className="w-22 text-label-14 text-text-secondary">
          연관검색어
        </span>
        <ul className="flex gap-4 text-text-tertiary">
          {MOCK_RELATED_KEYWORDS.map((relatedKeyword) => (
            <li key={relatedKeyword} className="min-w-21.5">
              <a href="#">{relatedKeyword}</a>
            </li>
          ))}
        </ul>
      </div>

      <div role="tablist" className="flex">
        {SEARCH_TABS.map((tab, index) => {
          const isSelected = index === 0;
          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={isSelected}
              className={cn(
                'flex h-13.5 w-60 items-center justify-center border text-title-16',
                isSelected
                  ? 'border-blue-90 bg-blue-90 text-white'
                  : 'border-border-default bg-surface-default text-text-secondary',
              )}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default SearchSummary;
