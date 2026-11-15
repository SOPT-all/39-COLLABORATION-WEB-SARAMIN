// 패키지 카드의 기본, 선택, 서류 누락, 지원 가능 상태
export type CardPackageState = 'default' | 'selected' | 'incomplete' | 'ready';

// 패키지 정보와 현재 상태를 외부에서 전달받음
export interface CardPackageProps {
  title: string;
  documentSummary: string;
  updatedLabel: string;
  state?: CardPackageState;
  className?: string;
}
