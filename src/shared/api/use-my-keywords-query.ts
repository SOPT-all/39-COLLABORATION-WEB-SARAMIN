import { useQuery } from '@tanstack/react-query';

import { getMyKeywords } from '@/shared/api/get-my-keywords';
import { QUERY_KEYS } from '@/shared/constants/query-keys';

// 홈 "나의 키워드" 패널 · 검색 MY FIT 칩 초기값에서 사용. 같은 키라 요청은 한 번만 나감
export const useMyKeywordsQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.USER.keywords,
    queryFn: getMyKeywords,
  });
};
