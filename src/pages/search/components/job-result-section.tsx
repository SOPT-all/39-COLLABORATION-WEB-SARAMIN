import type { SearchResult } from '@/pages/search/types/search';
import ChipNumber from '@/shared/components/chip/chip-number';
import RowSearchResult from '@/shared/components/row/row-search-result';
import SkeletonSearchResultItem from '@/shared/components/skeleton/skeleton-search-result-item';
import StateSearchResults from '@/shared/components/state-search-results/state-search-results';
import { cn } from '@/shared/utils/cn';

import IcBookmark from '@/shared/assets/icons/ic-bookmark.svg?react';

const SORT_OPTIONS = [
  { label: '매칭순', widthClassName: 'w-32.75' },
  { label: '마감임박', widthClassName: 'w-29.5' },
];

const PAGE_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const LOADING_ROW_COUNT = 3; // 로딩 중 보여줄 스켈레톤 개수 임의 설정

interface JobResultSectionProps {
  results: SearchResult[];
  totalCount: number;
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
}

const JobResultSection = ({
  results,
  totalCount,
  isLoading = false,
  isError = false,
  onRetry,
}: JobResultSectionProps) => {
  // 요청 중이거나 실패한 경우에는 이전 결과 수와 페이지 번호를 표시하지 않아요.
  const hasLoaded = !isLoading && !isError;
  const hasResults = hasLoaded && results.length > 0;
  const isEmpty = hasLoaded && results.length === 0;

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
            총 {(isEmpty ? 0 : totalCount).toLocaleString()}건
          </span>
        )}
      </div>

      <div className="mx-6.25 flex gap-2 px-3 py-2">
        {SORT_OPTIONS.map(({ label, widthClassName }, index) => {
          const isSelected = index === 0;
          return (
            <button
              key={label}
              type="button"
              aria-pressed={isSelected}
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
          {results.map((result) => (
            <li key={result.id}>
              <RowSearchResult
                contentState="loaded"
                matchCount={result.matchCount}
                deadline={result.deadline}
                matchedKeywords={result.matchedKeywords}
                title={result.title}
                meta={result.meta}
                companyName={result.companyName}
                companyMeta={result.companyMeta}
                isBookmarked={result.isBookmarked}
                // TODO: 북마크 저장·해제의 후속 작업 범위를 정한 뒤 공고 id별 상태 변경을 연결해요. 현재는 표시만 해요.
                onBookmarkClick={() => {}}
              />
            </li>
          ))}
        </ul>
      )}

      <div className="mx-2.25 flex flex-col items-end">
        <button
          type="button"
          className="flex h-11.5 w-47 items-center justify-center gap-1 rounded-lg bg-blue-90 px-5 text-label-14 text-white"
        >
          <IcBookmark aria-hidden className="shrink-0 fill-white text-white" />
          저장한 공고 보기
          <span className="text-body-12 text-blue-30">2개</span>
        </button>
        {hasResults && (
          <nav
            aria-label="페이지 이동"
            className="flex h-20 w-full items-center justify-center gap-1.5"
          >
            {PAGE_NUMBERS.map((pageNumber) => (
              <ChipNumber key={pageNumber} isSelected={pageNumber === 1}>
                {pageNumber}
              </ChipNumber>
            ))}
            <button
              type="button"
              className="ml-1.5 text-body-14 text-text-secondary"
            >
              다음 ›
            </button>
          </nav>
        )}
      </div>
    </section>
  );
};

export default JobResultSection;
