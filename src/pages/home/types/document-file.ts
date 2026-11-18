// 지원 서류 파일의 상태 (피그마 row_document: ready · needs_review)
export type DocumentFileStatus =
  | 'ready' // 사용 가능
  | 'needsReview'; // 검토 필요

// 지원 서류 관리 모달의 서류 파일 한 개 (서류 파일 API가 없어서 목 데이터 기준)
export interface DocumentFile {
  id: number;
  fileName: string;
  format: string;
  sizeLabel: string;
  updatedAt: string;
  status: DocumentFileStatus;
}
