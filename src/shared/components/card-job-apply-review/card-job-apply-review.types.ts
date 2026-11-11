export interface CardJobApplyReviewProps {
  title?: string;
  subtitle: string;
  sectionLabel?: string;
  documentSummary: string;
  consentLabel?: string;
  cancelLabel?: string;
  submitLabel?: string;
  onCancel: () => void;
  onSubmit: () => void;
  className?: string;
}
