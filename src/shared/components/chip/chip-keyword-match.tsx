import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

const ChipKeywordMatch = ({ className, ...props }: ComponentProps<'span'>) => {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full border border-[#93AFF6] px-2.25 py-0.75 text-label-14 whitespace-nowrap text-[#1C1C25]',
        className,
      )}
      {...props}
    />
  );
};

export default ChipKeywordMatch;
