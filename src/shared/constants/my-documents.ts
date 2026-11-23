import type { MyDocumentField } from '@/shared/types/my-documents';

// 스티키 허브 서류 행 목록. 위에서부터 이 순서로 표시
export const MY_DOCUMENT_FIELDS: MyDocumentField[] = [
  { id: 'hasResume', label: '이력서' },
  { id: 'hasCoverLetter', label: '자기소개서' },
  { id: 'hasCareer', label: '경력기술서' },
];

// API에 서류 개수가 없어 체크된 서류는 피그마처럼 1개로 표시
export const READY_DOCUMENT_COUNT = 1;
