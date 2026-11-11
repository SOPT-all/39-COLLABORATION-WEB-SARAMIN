export type StateMessageKind = 'empty' | 'error' | 'offline';
export type StateMessageScope = 'inline' | 'section';

export interface StateMessageAction {
  label: string;
  onClick: () => void;
}

export interface StateMessageProps {
  kind: StateMessageKind;
  scope?: StateMessageScope;
  title: string;
  description: string;
  action?: StateMessageAction;
  className?: string;
}
