import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

const VARIANT_CLASS_NAMES = {
  role: 'bg-blue-20 text-blue-90',
  skill: 'bg-surface-subtle text-text-secondary',
  benefit: 'bg-green-20 text-text-primary',
};

interface TagJobProps extends ComponentProps<'span'> {
  variant?: keyof typeof VARIANT_CLASS_NAMES;
}

const TagJob = ({ variant = 'role', className, ...props }: TagJobProps) => {
  return (
    <span
      className={cn(
        'inline-flex h-5.5 items-center justify-center gap-1 rounded-sm px-2 py-0.5 text-label-12 whitespace-nowrap',
        VARIANT_CLASS_NAMES[variant],
        className,
      )}
      {...props}
    />
  );
};

export default TagJob;
