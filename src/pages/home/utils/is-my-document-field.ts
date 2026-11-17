import { MY_DOCUMENT_FIELDS } from '@/pages/home/constants/my-documents';
import type { MyDocuments } from '@/pages/home/types/my-documents';

// 허브가 넘겨준 행 id(string)가 MyDocuments의 필드 이름인지 검사
export const isMyDocumentField = (id: string): id is keyof MyDocuments => {
  return MY_DOCUMENT_FIELDS.some((field) => field.id === id);
};
