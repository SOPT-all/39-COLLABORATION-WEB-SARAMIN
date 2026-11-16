import { APPLY_FILTERS } from '@/pages/home/constants/apply-filters';
import type { ApplyFilter } from '@/pages/home/types/recruit';
import ChipCount from '@/shared/components/chip/chip-count';
import ChipDropdown from '@/shared/components/chip/chip-dropdown';
import { cn } from '@/shared/utils/cn';

import IcStore from '@/shared/assets/icons/ic-store.svg?react';

interface ApplyFilterBarProps {
  selectedFilter: ApplyFilter | null;
  counts: Record<ApplyFilter, number>;
  onFilterChange: (filter: ApplyFilter) => void;
}

const BAR_BUTTON_CLASS_NAME =
  'flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg text-label-12 whitespace-nowrap';

const UNSELECTED_CLASS_NAME =
  'border border-border-default bg-surface-default text-text-secondary';

// 조건 저장은 API가 없어 UI만 있습니다.
// 정렬은 서버가 매칭순 고정이라 "추천순" 하나만 보여 줍니다.
const ApplyFilterBar = ({
  selectedFilter,
  counts,
  onFilterChange,
}: ApplyFilterBarProps) => {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-surface-subtle px-3 py-3.5">
      {APPLY_FILTERS.map(({ value, label }) => {
        const isSelected = selectedFilter === value;
        return (
          <button
            key={value}
            type="button"
            aria-pressed={isSelected}
            className={cn(
              BAR_BUTTON_CLASS_NAME,
              'pr-2 pl-2.5',
              isSelected
                ? 'bg-surface-blue-subtle text-blue-90'
                : UNSELECTED_CLASS_NAME,
            )}
            onClick={() => onFilterChange(value)}
          >
            {label}
            <ChipCount isActive={isSelected}>{counts[value]}</ChipCount>
          </button>
        );
      })}

      <button
        type="button"
        className={cn(
          BAR_BUTTON_CLASS_NAME,
          UNSELECTED_CLASS_NAME,
          'ml-auto px-2.5',
        )}
      >
        <span
          aria-hidden
          className="flex size-4 shrink-0 items-center justify-center"
        >
          <IcStore />
        </span>
        조건 저장
      </button>
      <ChipDropdown className="h-9 gap-1.5 rounded-lg border-border-default bg-surface-default pr-2 pl-2.5 text-label-12 font-medium text-text-primary">
        추천순
      </ChipDropdown>
    </div>
  );
};

export default ApplyFilterBar;
