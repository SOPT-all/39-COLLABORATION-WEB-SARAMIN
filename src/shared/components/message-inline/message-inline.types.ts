export type MessageInlineTone = 'info' | 'error' | 'success';

export interface MessageInlineAction {
  label: string;
  onClick: () => void;
}

export interface MessageInlineProps {
  tone?: MessageInlineTone;
  message: string;
  action?: MessageInlineAction;
  className?: string;
}
