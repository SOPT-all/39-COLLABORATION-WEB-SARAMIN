import {
  type ComponentProps,
  type MouseEvent,
  type SyntheticEvent,
  useEffect,
  useRef,
} from 'react';

import { cn } from '@/shared/utils/cn';

export interface ModalDialogProps extends Omit<
  ComponentProps<'dialog'>,
  'open' | 'onClose'
> {
  isOpen: boolean;
  onClose: () => void;
  canCloseOnBackdropClick?: boolean;
}

// 모달 동작만 담당하는 기본 다이얼로그예요. 화면은 Modal · ModalApplyReview가 그려요.
// - showModal()로 열어서 포커스가 모달 안에만 머물고, 바깥은 클릭 · 탭 이동이 막혀요.
// - ESC · 배경 클릭 시 onClose를 호출해요. (열고 닫는 상태는 부모가 관리)
// - 열려 있는 동안 페이지 스크롤을 막고, 닫히면 연 버튼으로 포커스가 돌아가요.
const ModalDialog = ({
  isOpen,
  onClose,
  canCloseOnBackdropClick = true,
  className,
  children,
  ...props
}: ModalDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isOpen]);

  // ESC로 닫힐 때 브라우저가 직접 닫지 않고, 부모 상태로 닫히게 해요.
  const handleCancel = (e: SyntheticEvent<HTMLDialogElement>) => {
    e.preventDefault();
    onClose();
  };

  // 모달 바깥(배경)을 누르면 이벤트 대상이 dialog 자신이에요.
  const handleClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (canCloseOnBackdropClick && e.target === e.currentTarget) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-modal="true"
      className={cn(
        'm-auto max-h-none max-w-none overflow-hidden bg-transparent p-0 backdrop:bg-black/40',
        className,
      )}
      onCancel={handleCancel}
      onClick={handleClick}
      {...props}
    >
      {children}
    </dialog>
  );
};

export default ModalDialog;
