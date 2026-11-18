import type { JobCardItem } from '@/pages/home/types/job-card';
import type { ApplyFilter } from '@/pages/home/types/recruit';

// 지원 필터 바에 보여줄 상태별 공고 개수예요. 마감 공고는 세지 않아요.
// 필터를 눌렀을 때 보이는 카드 수와 맞추려고, 같은 공고가 여러 섹션에 나오면 나온 만큼 세요.
export const getApplyStatusCounts = (recruits: JobCardItem[]) => {
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
