import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

const ChipStickyReview = ({ className, ...props }: ComponentProps<'span'>) => {
  return (
    <span
      className={cn(
        'inline-flex h-7 w-14.5 items-center justify-center rounded-full bg-surface-default text-center text-caption-11 whitespace-nowrap text-blue-90',
        className,
      )}
      {...props}
    />
  );
};

export default ChipStickyReview;
