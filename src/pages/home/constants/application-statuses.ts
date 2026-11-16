import type { ApplicationStatus } from '@/pages/home/types/application';

// label은 목록 행 칩 문구, detailLabel은 상세의 "현재 상태" 문구예요.
export const APPLICATION_STATUSES: Record<
  ApplicationStatus,
  { label: string; detailLabel: string }
> = {
  submitted: { label: '지원 완료', detailLabel: '지원서 접수 완료' },
  viewed: { label: '열람', detailLabel: '채용 담당자 열람' },
  under_review: { label: '검토 중', detailLabel: '채용 담당자 검토 중' },
  interview: { label: '면접', detailLabel: '면접 전형 진행 중' },
};
