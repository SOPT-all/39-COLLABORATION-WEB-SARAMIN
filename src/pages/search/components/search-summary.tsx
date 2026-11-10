import ChipSelectedFilter from '@/shared/components/chip/chip-selected-filter';
import { cn } from '@/shared/utils/cn';

interface SearchSummaryProps {
  keyword: string;
}

const SELECTED_FILTERS = ['서울', '경력 2–7년'];

const RELATED_KEYWORDS = [
  'UX 디자이너',
  'UIUX',
  '프로덕트 디자인',
  'Figma',
  '서비스 기획',
];

const SEARCH_TABS = ['통합검색', '✦ AI 검색', '채용정보', '기업정보'];

// 정적 UI예요. 필터 삭제 · 탭 전환은 API 연동 때 붙여요.
const handleRemoveFilter = () => {};

const SearchSummary = ({ keyword }: SearchSummaryProps) => {
  return (
    <section aria-label="검색 요약" className="mx-auto w-315">
      <div className="flex h-18.5 items-center justify-between px-5">
        <div className="flex items-center gap-2">
          <ChipSelectedFilter onRemove={handleRemoveFilter}>
            {keyword}
          </ChipSelectedFilter>
          {/* ChipSelectedFilter는 '검색어 · ' 접두어가 고정이라 일반 필터는 직접 그려요. */}
          {SELECTED_FILTERS.map((filter) => (
            <span
              key={filter}
              className="inline-flex h-8 items-center rounded-2xl border border-border-default bg-surface-default px-3 text-label-14 whitespace-nowrap text-text-secondary"
            >
              {filter}{' '}
              <button
                type="button"
                aria-label={`${filter} 삭제`}
                className="ml-1"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <p className="flex h-10 w-47.5 items-center justify-center rounded-lg bg-surface-subtle text-title-16 text-text-primary">
          729건 검색완료
        </p>
      </div>

      <div className="flex h-11 items-center gap-4 text-center text-body-14">
        <span className="w-22 text-label-14 text-text-secondary">
          연관검색어
        </span>
        <ul className="flex gap-4 text-text-tertiary">
          {RELATED_KEYWORDS.map((relatedKeyword) => (
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
