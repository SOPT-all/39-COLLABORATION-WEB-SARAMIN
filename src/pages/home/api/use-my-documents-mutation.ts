import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchMyDocuments } from '@/pages/home/api/patch-my-documents';
import { QUERY_KEYS } from '@/shared/constants/query-keys';
import type { MyDocuments } from '@/shared/types/my-documents';

// 보유 서류 체크 변경
// 서버가 저장한 값을 받으면 캐시를 그 값으로 교체
// 요청 중 중복 클릭은 반환값의 isPending으로 차단
export const useMyDocumentsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchMyDocuments,
    onSuccess: (savedDocuments) => {
      queryClient.setQueryData<MyDocuments>(
        QUERY_KEYS.USER.documents,
        savedDocuments,
      );
      // 공고의 matchedDocumentCount · missingDocuments가 서류 상태에 따라 달라짐
      // 추천 · 조회한 공고 · 마감 임박 쿼리가 모두 이 키로 시작
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.JOB_POSTING.all });
    },
  });
};
