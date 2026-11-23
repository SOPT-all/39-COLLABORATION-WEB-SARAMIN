import { useRef } from 'react';

// 모달을 여러 개 이어서 열고 닫을 때, 마지막 모달이 닫히면 처음 누른 버튼으로 포커스를 돌려요.
// (예: 서류 관리 → 서류 추가 → 서류 관리 → 닫기)
// 기본 dialog는 바로 앞 모달 안의 버튼으로 돌아가려 해서, 그 모달이 이미 닫혔으면 포커스가 페이지 맨 앞으로 빠져요.
export const useReturnFocus = () => {
  const triggerRef = useRef<HTMLElement | null>(null);

  // 첫 모달을 열 때 지금 포커스된 요소(연 버튼)를 기억해요.
  const rememberTrigger = () => {
    triggerRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
  };

  // 마지막 모달을 닫을 때 불러요. dialog가 닫히며 포커스를 옮긴 다음에 돌려놓아요.
  const restoreFocus = () => {
    const trigger = triggerRef.current;
    triggerRef.current = null;
    if (trigger) requestAnimationFrame(() => trigger.focus());
  };

  return { rememberTrigger, restoreFocus };
};
