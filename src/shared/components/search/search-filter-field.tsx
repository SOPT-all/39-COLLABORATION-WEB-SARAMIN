import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

import IcBriefcase from '@/shared/assets/icons/ic-briefcase.svg?react';
import IcFilters from '@/shared/assets/icons/ic-filters.svg?react';
import IcLocation from '@/shared/assets/icons/ic-location.svg?react';
import IcSearchFilter from '@/shared/assets/icons/ic-search-filter.svg?react';

type SearchFilterFieldIcon = 'search' | 'location' | 'briefcase' | 'filters';

// 페이지 연결: 표시 문구는 label, 왼쪽 아이콘은 icon, 클릭은 onClick입니다.
// label 기본값은 피그마 예시 문구입니다.
// 검색 아이콘은 기존 ic-search와 모양이 달라서 ic-search-filter를 썼습니다.
interface SearchFilterFieldProps extends Omit<
  ComponentProps<'button'>,
  'children'
> {
  icon?: SearchFilterFieldIcon;
  label?: string;
}

const icons = {
  search: IcSearchFilter,
  location: IcLocation,
  briefcase: IcBriefcase,
  filters: IcFilters,
} satisfies Record<SearchFilterFieldIcon, typeof IcSearchFilter>;

const SearchFilterField = ({
  icon = 'search',
  label = '프로덕트 디자이너',
  className,
  type = 'button',
  ...props
}: SearchFilterFieldProps) => {
  const Icon = icons[icon];

  return (
    <button
      type={type}
      className={cn(
        'flex h-[58px] items-center gap-2.5 border border-border-default bg-surface-default px-[18px] text-left text-body-16',
        icon === 'search' ? 'text-blue-90' : 'text-text-secondary',
        className,
      )}
      {...props}
    >
      <Icon className="shrink-0" aria-hidden />
      <span className="min-w-0 flex-1">{label}</span>
    </button>
  );
};

export default SearchFilterField;
