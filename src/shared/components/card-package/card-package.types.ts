export type CardPackageState = 'default' | 'selected' | 'incomplete' | 'ready';

export interface CardPackageProps {
  title: string;
  documentSummary: string;
  updatedLabel: string;
  state?: CardPackageState;
  className?: string;
}
