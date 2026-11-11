export type StateCompareEditState = 'default' | 'loading' | 'error' | 'success';

interface StateCompareEditBaseProps {
  className?: string;
}

export interface StateCompareEditFeedbackProps extends StateCompareEditBaseProps {
  state?: 'default' | 'loading' | 'success';
}

export interface StateCompareEditErrorProps extends StateCompareEditBaseProps {
  state: 'error';
  onRetry: () => void;
}

export type StateCompareEditProps =
  StateCompareEditFeedbackProps | StateCompareEditErrorProps;
