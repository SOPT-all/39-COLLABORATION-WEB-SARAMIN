import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

const BadgeCompany = ({ className, ...props }: ComponentProps<'span'>) => {
  return (
    <span
      className={cn(
        'inline-flex h-5 items-center justify-center rounded-sm bg-surface-subtle px-1.5 py-0.5 text-center text-caption-11 whitespace-nowrap text-text-tertiary',
        className,
      )}
      {...props}
    />
  );
};

export default BadgeCompany;
