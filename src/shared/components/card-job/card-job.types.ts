import type { ReactNode } from 'react';

// 채용 공고 카드에서 표현할 수 있는 13가지 상태
export type CardJobState =
  | 'default'
  | 'drag_ready'
  | 'drag_over'
  | 'success'
  | 'needs_document'
  | 'submitting'
  | 'error'
  | 'external'
  | 'closed'
  | 'needs_questions'
  | 'applied'
  | 'ineligible'
  | 'loading';

// 공고에 표시되는 직무, 기술, 복지 태그 정보
export interface CardJobTag {
  id: string;
  label: string;
  variant: 'role' | 'skill' | 'benefit';
}

// 채용 공고 카드의 정보, 상태 및 사용자 액션을 외부에서 전달받음
export interface CardJobProps {
  company: string;
  jobTitle: string;
  logo: ReactNode;
  tags: CardJobTag[];
  conditions: string;
  benefit?: string;
  companyBadge?: string;
  matchReason: string;
  deadline: string;
  updated: string;
  state?: CardJobState;
  isBookmarked?: boolean;
  onBookmarkChange: (isBookmarked: boolean) => void;
  onViewDetail: () => void;

  // 지원 영역은 별도 컴포넌트를 전달받아 표시
  applicationSlot: ReactNode;

  // 로딩 시 카드 전체를 대체할 스켈레톤 UI
  loadingSlot?: ReactNode;

  className?: string;
}
