import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/shared/constants/query-keys';

import { getRecruitDetail } from './get-recruit-detail';

export const useRecruitDetailQuery = (id: number) =>
  useQuery({
    queryKey: QUERY_KEYS.RECRUIT.detail(id),
    queryFn: () => getRecruitDetail(id),
  });
