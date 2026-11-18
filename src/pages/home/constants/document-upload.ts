// 서류 업로드에서 받는 파일 형식과 크기 (피그마: PDF/DOCX/HWP · 최대 20MB)
export const ACCEPTED_DOCUMENT_EXTENSIONS = ['pdf', 'docx', 'hwp'];
export const MAX_DOCUMENT_SIZE_BYTES = 20 * 1024 * 1024;

// 파일 선택 창에서 고를 수 있는 형식
export const DOCUMENT_FILE_ACCEPT = ACCEPTED_DOCUMENT_EXTENSIONS.map(
  (extension) => `.${extension}`,
).join(',');
