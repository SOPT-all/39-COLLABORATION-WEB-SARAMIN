import type { DocumentFile } from '@/pages/home/types/document-file';

const MINUTE_MS = 60 * 1000;
const DAY_MS = 24 * 60 * MINUTE_MS;

// 업데이트 시각이 오래돼 보이지 않게 지금 기준으로 만들어요. (피그마: 10분 전 · 어제 · 3일 전)
const getTimeBefore = (ms: number) => new Date(Date.now() - ms).toISOString();

export const MOCK_DOCUMENT_FILES: DocumentFile[] = [
  {
    id: 1,
    fileName: '이력서_백엔드개발.pdf',
    format: 'PDF',
    sizeLabel: '1.8 MB',
    updatedAt: getTimeBefore(10 * MINUTE_MS),
    status: 'ready',
  },
  {
    id: 2,
    fileName: '자기소개서_사람인.docx',
    format: 'DOCX',
    sizeLabel: '860 KB',
    updatedAt: getTimeBefore(DAY_MS),
    status: 'needsReview',
  },
  {
    id: 3,
    fileName: '경력기술서_2026.pdf',
    format: 'PDF',
    sizeLabel: '2.4 MB',
    updatedAt: getTimeBefore(3 * DAY_MS),
    status: 'ready',
  },
];
