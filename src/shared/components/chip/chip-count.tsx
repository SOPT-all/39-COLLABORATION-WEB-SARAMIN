import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

interface ChipCountProps extends ComponentProps<'span'> {
  isActive?: boolean;
}

const ChipCount = ({
  isActive = false,
  className,
  ...props
}: ChipCountProps) => {
  return (
    <span
      className={cn(
        'flex size-5 items-center justify-center rounded-full text-center text-caption-11',
        isActive
          ? 'bg-blue-90 text-white'
          : 'bg-surface-subtle text-text-tertiary',
        className,
      )}
      {...props}
    />
  );
};

export default ChipCount;
