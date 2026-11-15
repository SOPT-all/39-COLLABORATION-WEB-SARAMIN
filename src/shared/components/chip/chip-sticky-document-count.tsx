import type { ComponentProps } from 'react';

import ChipCount from '@/shared/components/chip/chip-count';
import { cn } from '@/shared/utils/cn';

const ChipStickyDocumentCount = ({
  className,
  ...props
}: ComponentProps<'span'>) => {
  return (
    <ChipCount
      className={cn('size-6 bg-surface-default text-blue-90', className)}
      {...props}
    />
  );
};

export default ChipStickyDocumentCount;
