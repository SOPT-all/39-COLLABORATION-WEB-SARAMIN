import type { ReactNode } from 'react';

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

export interface CardJobTag {
  id: string;
  label: string;
  variant: 'role' | 'skill' | 'benefit';
}

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
  /** Receives the application component; its background, divider and events belong to the slot. */
  applicationSlot: ReactNode;
  /** Full-card loading content supplied by the skeleton owner. */
  loadingSlot?: ReactNode;
  className?: string;
}
