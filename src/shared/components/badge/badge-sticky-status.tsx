import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

const VARIANT_CLASS_NAMES = {
  primary: 'text-blue-90',
  danger: 'text-coral-100',
};

interface BadgeStickyStatusProps extends ComponentProps<'span'> {
  variant?: keyof typeof VARIANT_CLASS_NAMES;
}

const BadgeStickyStatus = ({
  variant = 'primary',
  className,
  ...props
}: BadgeStickyStatusProps) => {
  return (
    <span
      className={cn(
        'inline-flex h-6 w-16 items-center justify-center rounded-full bg-surface-default text-center text-label-12 whitespace-nowrap',
        VARIANT_CLASS_NAMES[variant],
        className,
      )}
      {...props}
    />
  );
};

export default BadgeStickyStatus;
