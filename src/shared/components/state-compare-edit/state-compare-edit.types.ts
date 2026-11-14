//비교 편집의 저장 진행 상태 4개
export type StateCompareEditState = 'default' | 'loading' | 'error' | 'success';

interface StateCompareEditBaseProps {
  className?: string;
}

export interface StateCompareEditFeedbackProps extends StateCompareEditBaseProps {
  state?: 'default' | 'loading' | 'success';
}

// 오류 상태에서는 '다시 시도' 버튼의 클릭 함수를 필수로 받음
export interface StateCompareEditErrorProps extends StateCompareEditBaseProps {
  state: 'error';
  onRetry: () => void;
}

export type StateCompareEditProps =
  StateCompareEditFeedbackProps | StateCompareEditErrorProps;
