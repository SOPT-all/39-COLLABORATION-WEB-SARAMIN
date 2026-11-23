import { useQuery } from '@tanstack/react-query';

import { getMyDocuments } from '@/shared/api/get-my-documents';
import { QUERY_KEYS } from '@/shared/constants/query-keys';

// 보유 서류 체크 상태 조회. 홈 진입 · 새로고침 때 체크 초기값으로 사용
// 체크 변경(useMyDocumentsMutation)이 같은 키의 캐시를 직접 수정
export const useMyDocumentsQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.USER.documents,
    queryFn: getMyDocuments,
  });
};
