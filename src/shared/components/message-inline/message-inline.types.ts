// 알림 상태 종류 3개
export type MessageInlineTone = 'info' | 'error' | 'success';

// 오류 상태에서 사용할 버튼 정보
export interface MessageInlineAction {
  label: string;
  onClick: () => void;
}

// MessageInline 컴포넌트가 전달받을 props
export interface MessageInlineProps {
  tone?: MessageInlineTone;
  message: string;
  action?: MessageInlineAction;
  className?: string;
}
