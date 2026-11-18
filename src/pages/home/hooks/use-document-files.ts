import { useQuery } from '@tanstack/react-query';

import { MOCK_DOCUMENT_FILES } from '@/pages/home/constants/mock-document-files';
import type { DocumentFile } from '@/pages/home/types/document-file';
import { QUERY_KEYS } from '@/shared/constants/query-keys';

const MOCK_DELAY_MS = 500;

// 서류 파일 API는 서버 범위 밖이라 목 데이터를 돌려줘요.
// 로딩 화면을 보여줄 수 있게 일부러 조금 늦게 응답해요.
const getDocumentFiles = () =>
  new Promise<DocumentFile[]>((resolve) => {
    setTimeout(() => resolve(MOCK_DOCUMENT_FILES), MOCK_DELAY_MS);
  });

interface UseDocumentFilesOptions {
  enabled?: boolean;
}

// 지원 서류 관리 모달의 서류 파일 목록이에요. 모달이 열렸을 때만 불러와요.
// 서류를 추가하면(#101) 같은 키의 캐시에 넣어 목록에 바로 보이게 해요.
export const useDocumentFiles = ({
  enabled = true,
}: UseDocumentFilesOptions = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.USER.documentFiles,
    queryFn: getDocumentFiles,
    enabled,
  });
};
