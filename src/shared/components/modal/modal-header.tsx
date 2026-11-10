import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

import IcClose from '@/shared/assets/icons/ic-close.svg?react';

interface ModalHeaderProps extends ComponentProps<'div'> {
  title: string;
  titleId?: string;
  onClose: () => void;
}

const ModalHeader = ({
  title,
  titleId,
  onClose,
  className,
  ...props
}: ModalHeaderProps) => {
  return (
    <div
      className={cn(
        'flex h-16 shrink-0 items-center gap-3 bg-surface-default px-6 py-2',
        className,
      )}
      {...props}
    >
      <h2 id={titleId} className="flex-1 text-heading-20 text-text-primary">
        {title}
      </h2>
      <button
        type="button"
        aria-label="닫기"
        className="flex size-11 shrink-0 items-center justify-center rounded-lg hover:bg-surface-subtle"
        onClick={onClose}
      >
        <IcClose aria-hidden />
      </button>
    </div>
  );
};

export default ModalHeader;
