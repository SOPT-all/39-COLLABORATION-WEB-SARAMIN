import {
  ACCEPTED_DOCUMENT_EXTENSIONS,
  MAX_DOCUMENT_SIZE_BYTES,
} from '@/pages/home/constants/document-upload';

// 파일 이름에 들어간 단어로 서류 유형을 짐작해요. (서버 분석이 없어서 화면용)
const DOCUMENT_TYPE_KEYWORDS = [
  { type: '이력서', keywords: ['이력서', 'resume', 'cv'] },
  { type: '자기소개서', keywords: ['자기소개서', '자소서', 'cover'] },
  { type: '경력기술서', keywords: ['경력기술서', '경력', 'career'] },
];

const DEFAULT_DOCUMENT_TYPE = '기타 서류';

export const getFileExtension = (fileName: string) =>
  fileName.split('.').pop()?.toLowerCase() ?? '';

// 지원 형식(PDF/DOCX/HWP)이고 20MB 이하인지 확인해요.
export const checkIsValidDocumentFile = (file: File) =>
  ACCEPTED_DOCUMENT_EXTENSIONS.includes(getFileExtension(file.name)) &&
  file.size <= MAX_DOCUMENT_SIZE_BYTES;

export const getDocumentType = (fileName: string) => {
  const lowerFileName = fileName.toLowerCase();
  return (
    DOCUMENT_TYPE_KEYWORDS.find(({ keywords }) =>
      keywords.some((keyword) => lowerFileName.includes(keyword)),
    )?.type ?? DEFAULT_DOCUMENT_TYPE
  );
};
