// 최종 지원 확인 카드에 표시할 정보와 버튼 동작을 정의
export interface CardJobApplyReviewProps {
  title?: string;
  subtitle: string;
  sectionLabel?: string;
  documentSummary: string;
  consentLabel?: string;
  cancelLabel?: string;
  submitLabel?: string;

  // 실제 취소 및 지원 요청은 부모 컴포넌트에서 처리
  onCancel: () => void;
  onSubmit: () => void;

  className?: string;
}
