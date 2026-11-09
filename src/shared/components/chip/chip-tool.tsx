import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

const VARIANT_CLASS_NAMES = {
  blue: 'bg-surface-blue-subtle text-blue-90',
  green: 'bg-green-20 text-status-success',
  red: 'bg-coral-20 text-status-danger',
};

interface ChipToolProps extends ComponentProps<'span'> {
  variant?: keyof typeof VARIANT_CLASS_NAMES;
}

const ChipTool = ({ variant = 'blue', className, ...props }: ChipToolProps) => {
  return (
    <span
      className={cn(
        'inline-flex h-7.5 w-16.75 items-center justify-center rounded-full px-2.5 py-1.5 text-center text-caption-12 whitespace-nowrap',
        VARIANT_CLASS_NAMES[variant],
        className,
      )}
      {...props}
    />
  );
};

export default ChipTool;
