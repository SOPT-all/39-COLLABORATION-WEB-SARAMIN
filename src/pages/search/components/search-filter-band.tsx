import { cn } from '@/shared/utils/cn';

import IcBriefcase from '@/shared/assets/icons/ic-briefcase.svg?react';
import IcChevronDown from '@/shared/assets/icons/ic-chevron-down.svg?react';
import IcFilters from '@/shared/assets/icons/ic-filters.svg?react';
import IcLocation from '@/shared/assets/icons/ic-location.svg?react';
import IcSearch from '@/shared/assets/icons/ic-search.svg?react';

interface SearchFilterBandProps {
  keyword: string;
}

const FIELD_CLASS_NAME =
  'flex h-14.5 items-center gap-2.5 border border-border-default bg-surface-default px-4.5 text-body-16 text-text-secondary';

const SearchFilterBand = ({ keyword }: SearchFilterBandProps) => {
  return (
    <section aria-label="검색 조건" className="bg-blue-90">
      <div className="mx-auto w-315">
        <div className="flex h-9.5 items-center justify-between text-label-14 text-white">
          <div className="flex gap-4.5">
            <button type="button" className="flex w-27 items-center">
              경력 선택
              <IcChevronDown aria-hidden className="shrink-0" />
            </button>
            <button type="button" className="flex w-27 items-center">
              학력 선택
              <IcChevronDown aria-hidden className="shrink-0" />
            </button>
          </div>
          <a href="#">나의 검색 / 메일관리</a>
        </div>

        <div className="flex">
          <div className={cn(FIELD_CLASS_NAME, 'w-102.5 text-blue-90')}>
            <IcSearch aria-hidden className="shrink-0" />
            {keyword}
          </div>
          <button type="button" className={cn(FIELD_CLASS_NAME, 'w-87.5')}>
            <IcLocation aria-hidden className="shrink-0" />
            지역 선택
          </button>
          <button type="button" className={cn(FIELD_CLASS_NAME, 'w-87.5')}>
            <IcBriefcase aria-hidden className="shrink-0" />
            직업 선택
          </button>
          <button type="button" className={cn(FIELD_CLASS_NAME, 'w-37.5')}>
            <IcFilters aria-hidden className="shrink-0 text-gray-80" />
            상세조건
          </button>
        </div>
      </div>
    </section>
  );
};

export default SearchFilterBand;
