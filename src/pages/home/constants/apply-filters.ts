import type { ApplyFilter } from '@/pages/home/types/recruit';

// 지원 필터 바 순서와 문구
export const APPLY_FILTERS: { value: ApplyFilter; label: string }[] = [
  { value: 'ready', label: '바로 지원' },
  { value: 'needsDocuments', label: '서류 준비' },
  { value: 'external', label: '외부 지원' },
  { value: 'applied', label: '지원 완료' },
];
