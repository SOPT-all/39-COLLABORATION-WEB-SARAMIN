// 지원 서류 스택의 기본, 드래그 중, 비활성화 상태
export type StackApplicationDocumentState = 'default' | 'grabbed' | 'disabled';

// 현재 상태와 추가 스타일을 외부에서 전달받음
export interface StackApplicationDocumentProps {
  state?: StackApplicationDocumentState;
  className?: string;
}
