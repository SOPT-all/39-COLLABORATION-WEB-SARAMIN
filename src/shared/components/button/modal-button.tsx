import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

const VARIANT_CLASS_NAMES = {
  primary: 'bg-blue-90 text-white',
  secondary: 'border border-border-default bg-surface-default text-blue-90',
};

interface ModalButtonProps extends ComponentProps<'button'> {
  variant?: keyof typeof VARIANT_CLASS_NAMES;
}

const ModalButton = ({
  variant = 'primary',
  className,
  ...props
}: ModalButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        'flex h-11 w-37 items-center justify-center gap-2 rounded-lg text-center text-label-14 disabled:border-0 disabled:bg-surface-subtle disabled:text-text-tertiary',
        VARIANT_CLASS_NAMES[variant],
        className,
      )}
      {...props}
    />
  );
};

export default ModalButton;
