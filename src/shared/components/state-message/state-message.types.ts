// 메시지의 종류(결과 없음 / 오류 / 네트워크 연결 문제)
export type StateMessageKind = 'empty' | 'error' | 'offline';

// 메시지의 배치 형태(가로형 / 세로형)
export type StateMessageScope = 'inline' | 'section';

// 선택적으로 표시하는 액션 버튼의 정보
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
