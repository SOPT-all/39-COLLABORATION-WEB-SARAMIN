import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

const TagEssential = ({
  className,
  ...props
}: Omit<ComponentProps<'span'>, 'children'>) => {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full bg-coral-30 px-2.75 py-1 text-caption-11 whitespace-nowrap text-coral-100',
        className,
      )}
      {...props}
    >
      필수
    </span>
  );
};

export default TagEssential;
