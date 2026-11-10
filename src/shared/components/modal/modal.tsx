import { type ReactNode, useId } from 'react';

import ModalDialog, {
  type ModalDialogProps,
} from '@/shared/components/modal/modal-dialog';
import ModalFooter from '@/shared/components/modal/modal-footer';
import ModalHeader from '@/shared/components/modal/modal-header';
import { cn } from '@/shared/utils/cn';

// 피그마 modal_shell 크기 (compact 480×360 · standard 560×400 · wide 720×680)
const SIZE_CLASS_NAMES = {
  compact: 'h-90 w-120',
  standard: 'h-100 w-140',
  wide: 'h-170 w-180',
};

interface ModalProps extends ModalDialogProps {
  title: string;
  size?: keyof typeof SIZE_CLASS_NAMES;
  footer?: ReactNode;
}

const Modal = ({
  title,
  size = 'compact',
  footer,
  onClose,
  className,
  children,
  ...props
}: ModalProps) => {
  const titleId = useId();

  return (
    <ModalDialog
      aria-labelledby={titleId}
      className={cn(
        'flex-col rounded-2xl bg-surface-default shadow-[0_4px_12px_0_rgba(31,41,55,0.08),0_16px_40px_0_rgba(31,41,55,0.18)] open:flex',
        SIZE_CLASS_NAMES[size],
        className,
      )}
      onClose={onClose}
      {...props}
    >
      <ModalHeader title={title} titleId={titleId} onClose={onClose} />
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-6">
        {children}
      </div>
      {footer && <ModalFooter>{footer}</ModalFooter>}
    </ModalDialog>
  );
};

export default Modal;
