import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

const VARIANT_CLASS_NAMES = {
  neutral: 'bg-surface-subtle text-text-secondary',
  info: 'bg-surface-blue-subtle text-blue-90',
  success: 'bg-status-success text-white',
  danger: 'bg-status-danger text-white',
};

interface BadgeModalStatusProps extends ComponentProps<'span'> {
  variant?: keyof typeof VARIANT_CLASS_NAMES;
}

const BadgeModalStatus = ({
  variant = 'neutral',
  className,
  ...props
}: BadgeModalStatusProps) => {
  return (
    <span
      className={cn(
        'inline-flex h-6 items-center justify-center gap-2 rounded-full px-2 text-caption-12 whitespace-nowrap',
        VARIANT_CLASS_NAMES[variant],
        className,
      )}
      {...props}
    />
  );
};

export default BadgeModalStatus;
