import type { ReactNode } from 'react';

export type BundleApplicationState =
  'default' | 'grabbed' | 'disabled' | 'loading';

export interface BundleApplicationProps {
  title: string;
  meta: string;
  state?: BundleApplicationState;
  /** Full inner loading content. The bundle owns the border, size and 12px padding. */
  loadingSlot?: ReactNode;
  className?: string;
}
