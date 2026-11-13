import type { ReactNode } from 'react';

// 지원 패키지 묶음의 기본, 드래그 중, 비활성화, 로딩 상태
export type BundleApplicationState =
  'default' | 'grabbed' | 'disabled' | 'loading';

// 패키지 정보와 현재 상태, 로딩 UI를 외부에서 전달받음
export interface BundleApplicationProps {
  title: string;
  meta: string;
  state?: BundleApplicationState;

  // 로딩 시 카드 내부에 표시할 스켈레톤 UI
  loadingSlot?: ReactNode;

  className?: string;
}
