import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

import IcDragHandle from '@/shared/assets/icons/ic-drag-handle.svg?react';

interface DragHandleButtonProps extends ComponentProps<'button'> {
  isGrabbed?: boolean;
}

const DragHandleButton = ({
  isGrabbed = false,
  className,
  'aria-label': ariaLabel = '순서 변경',
  ...props
}: DragHandleButtonProps) => {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={cn(
        'flex size-11 items-center justify-center rounded-[10px] text-text-secondary disabled:cursor-default disabled:bg-surface-subtle disabled:text-coral-70',
        isGrabbed
          ? 'cursor-grabbing bg-blue-20'
          : 'cursor-grab bg-surface-subtle',
        className,
      )}
      {...props}
    >
      <IcDragHandle aria-hidden />
    </button>
  );
};

export default DragHandleButton;
