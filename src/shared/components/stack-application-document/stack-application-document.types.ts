export type StackApplicationDocumentState = 'default' | 'grabbed' | 'disabled';

export interface StackApplicationDocumentProps {
  state?: StackApplicationDocumentState;
  className?: string;
}
