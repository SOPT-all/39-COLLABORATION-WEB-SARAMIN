import type { ApplyFilter, Recruit } from '@/pages/home/types/recruit';

// 지원 필터 바에 보여줄 상태별 공고 개수 (마감 공고는 세지 않아요)
export const getApplyStatusCounts = (recruits: Recruit[]) => {
  const counts: Record<ApplyFilter, number> = {
    ready: 0,
    needsDocuments: 0,
    external: 0,
    applied: 0,
  };

  recruits.forEach(({ applyStatus }) => {
    if (applyStatus !== 'closed') counts[applyStatus] += 1;
  });

  return counts;
};
