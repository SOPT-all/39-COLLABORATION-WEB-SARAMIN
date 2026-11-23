import {
  MY_DOCUMENT_FIELDS,
  READY_DOCUMENT_COUNT,
} from '@/shared/constants/my-documents';
import type { MyDocuments } from '@/shared/types/my-documents';

const DOCUMENT_SEPARATOR = ' · ';

// 지원 내용 확인 모달의 제출 서류 문구 생성. 체크한 서류만 포함
// 예) 경력기술서만 해제 → '이력서 1 · 자기소개서 1'
export const createApplyDocumentSummary = (myDocuments: MyDocuments) => {
  return MY_DOCUMENT_FIELDS.filter(({ id }) => myDocuments[id])
    .map(({ label }) => `${label} ${READY_DOCUMENT_COUNT}`)
    .join(DOCUMENT_SEPARATOR);
};
