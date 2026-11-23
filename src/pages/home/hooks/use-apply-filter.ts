import { useSearchParams } from 'react-router';

import { APPLY_FILTERS } from '@/pages/home/constants/apply-filters';
import { HOME_FILTER_PARAM } from '@/pages/home/constants/home-search-params';
import type { ApplyFilter } from '@/pages/home/types/recruit';

const checkIsApplyFilter = (value: string | null): value is ApplyFilter =>
  APPLY_FILTERS.some((filter) => filter.value === value);

// 지원 필터 바(#53)와 공고 피드(#52)가 함께 쓰는 선택 상태예요.
// 같은 필터를 다시 누르면 선택이 풀려 전체 공고를 보여줘요.
// 선택은 주소(?filter=)에 남겨서 다른 화면에 갔다가 뒤로가기로 돌아와도 유지돼요.
export const useApplyFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterParam = searchParams.get(HOME_FILTER_PARAM);
  // 주소에 모르는 값이 있으면 선택 없음으로 봐요.
  const selectedFilter = checkIsApplyFilter(filterParam) ? filterParam : null;

  const toggleFilter = (filter: ApplyFilter) => {
    setSearchParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        if (selectedFilter === filter) next.delete(HOME_FILTER_PARAM);
        else next.set(HOME_FILTER_PARAM, filter);
        return next;
      },
      // 필터를 누를 때마다 기록이 쌓이거나 화면이 맨 위로 가지 않게 해요.
      { replace: true, preventScrollReset: true },
    );
  };

  return { selectedFilter, toggleFilter };
};
