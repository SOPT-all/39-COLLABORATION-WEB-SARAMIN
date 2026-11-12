import { APPLY_FILTERS } from '@/pages/home/constants/apply-filters';
import type { ApplyFilter } from '@/pages/home/types/recruit';

interface ApplyFilterBarProps {
  selectedFilter: ApplyFilter | null;
  counts: Record<ApplyFilter, number>;
  onFilterChange: (filter: ApplyFilter) => void;
}

// TODO(#53 주형): 디자인 적용 (ChipCount, 조건 저장, 추천순)
// 필터 선택 → 공고 피드 반영은 이미 연결돼 있어요. 버튼 모양만 바꾸면 돼요.
const ApplyFilterBar = ({
  selectedFilter,
  counts,
  onFilterChange,
}: ApplyFilterBarProps) => {
  return (
    <div className="flex h-16 items-center justify-center gap-2 rounded-2xl border border-dashed border-border-default text-body-14 text-text-tertiary">
      지원 필터 바 (#53) ·
      {APPLY_FILTERS.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          aria-pressed={selectedFilter === value}
          className="underline aria-pressed:text-blue-90"
          onClick={() => onFilterChange(value)}
        >
          {label} {counts[value]}
        </button>
      ))}
    </div>
  );
};

export default ApplyFilterBar;
