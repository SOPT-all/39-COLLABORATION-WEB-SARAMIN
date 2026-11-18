import { useState } from 'react';

import CompareModal from '@/pages/search/components/compare-modal';
import type { SearchResult, SearchSort } from '@/pages/search/types/search';
import { sortSearchResults } from '@/pages/search/utils/sort-search-results';
import MyfitSearchButton from '@/shared/components/button/myfit-search-button';
import ChipNumber from '@/shared/components/chip/chip-number';
import RowSearchResult from '@/shared/components/row/row-search-result';
import SkeletonSearchResultItem from '@/shared/components/skeleton/skeleton-search-result-item';
import StateSearchResults from '@/shared/components/state-search-results/state-search-results';
import { useBookmarks } from '@/shared/hooks/use-bookmarks';
import { cn } from '@/shared/utils/cn';

const SORT_OPTIONS: {
  value: SearchSort;
  label: string;
  widthClassName: string;
}[] = [
  { value: 'match', label: '매칭순', widthClassName: 'w-32.75' },
  { value: 'deadline', label: '마감임박', widthClassName: 'w-29.5' },
];

const PAGE_GROUP_SIZE = 10; // 한 번에 보여줄 번호 개수예요.
const LOADING_ROW_COUNT = 3;

interface JobResultSectionProps {
  results: SearchResult[];
  totalCount: number;
  keywordCount: number; // 적용한 MY FIT 키워드 수예요. 조건을 아직 안 보내면 0이에요.
  currentPage: number; // 0부터 시작해요. 화면 번호는 1을 더해 보여요.
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
}

const JobResultSection = ({
  results,
  totalCount,
  keywordCount,
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
  isError = false,
  onRetry,
}: JobResultSectionProps) => {
  const { getIsBookmarked, setBookmark, bookmarkedJobs } = useBookmarks();
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  // 고른 정렬은 페이지를 넘기거나 검색어를 바꿔도 유지돼요.
  const [sort, setSort] = useState<SearchSort>('match');
  const sortedResults = sortSearchResults(results, sort);
  // 로딩·오류 중에는 건수와 페이지 번호를 숨겨요.
  const hasLoaded = !isLoading && !isError;
  const hasResults = hasLoaded && results.length > 0;
  const isEmpty = hasLoaded && results.length === 0;
  const pageGroupStart =
    Math.floor(currentPage / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE;
  const visiblePageCount = Math.max(
    0,
    Math.min(PAGE_GROUP_SIZE, totalPages - pageGroupStart),
  );
  const pageNumbers = Array.from(
    { length: visiblePageCount },
    (_, index) => pageGroupStart + index,
  );

  return (
    <section aria-labelledby="job-result-title">
      <div className="flex items-center gap-2 px-6.75 py-4.5">
        <h2
          id="job-result-title"
          className="w-33 text-heading-24 text-text-primary"
        >
          채용정보
        </h2>
        {hasLoaded && (
          <span className="text-body-14 text-text-tertiary">
            총 {totalCount.toLocaleString()}건
          </span>
        )}
      </div>

      <div className="mx-6.25 flex gap-2 px-3 py-2">
        {SORT_OPTIONS.map(({ value, label, widthClassName }) => {
          const isSelected = value === sort;
          return (
            <button
              key={value}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setSort(value)}
              className={cn(
                'flex h-8 items-center justify-center rounded-2xl text-label-14',
                widthClassName,
                isSelected
                  ? 'border-[1.5px] border-blue-90 bg-surface-blue-subtle text-blue-90'
                  : 'border border-border-default bg-surface-default text-text-secondary',
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      {isLoading && (
        <StateSearchResults
          contentState="loading"
          className="w-full"
          loadingSlot={
            <div className="mx-4.75">
              {Array.from({ length: LOADING_ROW_COUNT }, (_, index) => (
                <SkeletonSearchResultItem key={index} className="w-full" />
              ))}
            </div>
          }
        />
      )}
      {isEmpty && (
        <StateSearchResults contentState="empty" className="w-full" />
      )}
      {!isLoading && isError && (
        <StateSearchResults
          contentState="error"
          className="w-full"
          action={
            onRetry ? { label: '다시 시도', onClick: onRetry } : undefined
          }
        />
      )}
      {hasResults && (
        <ul className="mx-4.75">
          {sortedResults.map((result, index) => {
            const isBookmarked = getIsBookmarked(
              result.id,
              result.isBookmarked,
            );
            return (
              <li key={result.id}>
                <RowSearchResult
                  contentState="loaded"
                  className={
                    index === results.length - 1 ? 'border-b-0' : undefined
                  }
                  matchCount={result.matchCount}
                  keywordCount={keywordCount}
                  deadline={result.deadline}
                  matchedKeywords={result.matchedKeywords}
                  title={result.title}
                  meta={result.meta}
                  companyName={result.companyName}
                  companyMeta={result.companyMeta}
                  isBookmarked={isBookmarked}
                  onBookmarkClick={() =>
                    setBookmark(result.id, !isBookmarked, result.compareJob)
                  }
                />
              </li>
            );
          })}
        </ul>
      )}

      <div className="mx-2.25 flex flex-col items-end">
        {/* 스크랩한 공고 = 비교 대상. 홈에서 스크랩한 공고도 함께 세요. (기능명세서 FR-07 · FR-10) */}
        <MyfitSearchButton
          resultCount={bookmarkedJobs.length}
          aria-haspopup="dialog"
          onClick={() => setIsCompareOpen(true)}
        >
          저장한 공고 보기
        </MyfitSearchButton>
        {hasResults && totalPages > 1 && (
          <nav
            aria-label="페이지 이동"
            className="flex h-20 w-full items-center justify-center gap-1.5"
          >
            <button
              type="button"
              disabled={currentPage === 0}
              onClick={() => onPageChange(currentPage - 1)}
              className="mr-1.5 text-body-14 text-text-secondary disabled:cursor-not-allowed disabled:opacity-50"
            >
              ‹ 이전
            </button>

            {pageNumbers.map((page) => (
              <ChipNumber
                key={page}
                isSelected={page === currentPage}
                onClick={() => onPageChange(page)}
              >
                {page + 1}
              </ChipNumber>
            ))}
            <button
              type="button"
              disabled={currentPage >= totalPages - 1}
              onClick={() => onPageChange(currentPage + 1)}
              className="ml-1.5 text-body-14 text-text-secondary disabled:cursor-not-allowed disabled:opacity-50"
            >
              다음 ›
            </button>
          </nav>
        )}
      </div>
      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
      />
    </section>
  );
};

export default JobResultSection;
