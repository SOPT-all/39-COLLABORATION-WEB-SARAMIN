import ChipNumber from '@/shared/components/chip/chip-number';
import { cn } from '@/shared/utils/cn';

import IcBookmark from '@/shared/assets/icons/ic-bookmark.svg?react';

const SORT_OPTIONS = [
  { label: '매칭순', widthClassName: 'w-32.75' },
  { label: '마감임박', widthClassName: 'w-29.5' },
];

// 결과 행은 검색 컴포넌트(#30)의 row_search_result로 교체해요.
const RESULT_ROW_COUNT = 7;
const PAGE_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const JobResultSection = () => {
  return (
    <section aria-labelledby="job-result-title">
      <div className="flex items-center gap-2 px-6.75 py-4.5">
        <h2
          id="job-result-title"
          className="w-33 text-heading-24 text-text-primary"
        >
          채용정보
        </h2>
        <span className="text-body-14 text-text-tertiary">총 729건</span>
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

      <ul className="mx-4.75">
        {Array.from({ length: RESULT_ROW_COUNT }, (_, index) => (
          <li
            key={index}
            className="flex h-41.25 items-center justify-center border-b border-gray-30 text-body-14 text-text-tertiary"
          >
            검색 결과 행 자리
          </li>
        ))}
      </ul>

      <div className="mx-2.25 flex flex-col items-end">
        <button
          type="button"
          className="flex h-11.5 w-47 items-center justify-center gap-1 rounded-lg bg-blue-90 px-5 text-label-14 text-white"
        >
          <IcBookmark aria-hidden className="shrink-0 fill-white text-white" />
          저장한 공고 보기
          <span className="text-body-12 text-blue-30">2개</span>
        </button>
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
      </div>
    </section>
  );
};

export default JobResultSection;
