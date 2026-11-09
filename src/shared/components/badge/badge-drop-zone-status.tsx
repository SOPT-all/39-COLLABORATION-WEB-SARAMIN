import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

interface BadgeDropZoneStatusProps extends ComponentProps<'span'> {
  isHighlighted?: boolean;
}

const BadgeDropZoneStatus = ({
  isHighlighted = false,
  className,
  ...props
}: BadgeDropZoneStatusProps) => {
  return (
    <span
      className={cn(
        'inline-flex h-5.5 items-center justify-center gap-1.25 rounded-full px-1.75 py-0.5 text-center text-caption-11 whitespace-nowrap text-text-primary',
        isHighlighted ? 'bg-blue-20' : 'bg-surface-default',
        className,
      )}
      {...props}
    />
  );
};

export default BadgeDropZoneStatus;
