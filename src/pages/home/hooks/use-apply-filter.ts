import { useState } from 'react';

import type { ApplyFilter } from '@/pages/home/types/recruit';

// 지원 필터 바(#53)와 공고 피드(#52)가 함께 쓰는 선택 상태예요.
// 같은 필터를 다시 누르면 선택이 풀려 전체 공고를 보여줘요.
export const useApplyFilter = () => {
  const [selectedFilter, setSelectedFilter] = useState<ApplyFilter | null>(
    null,
  );

  const toggleFilter = (filter: ApplyFilter) => {
    setSelectedFilter((prev) => (prev === filter ? null : filter));
  };

  return { selectedFilter, toggleFilter };
};
