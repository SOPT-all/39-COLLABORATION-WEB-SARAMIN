import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

const VARIANT_CLASS_NAMES = {
  blue: 'bg-[#F2F6FF] text-[#2D67FF]',
  red: 'bg-[#FFF0F0] text-[#D9363E]',
  green: 'bg-[#EAFBF5] text-[#16815D]',
};

interface BadgeMetadataProps extends ComponentProps<'span'> {
  variant?: keyof typeof VARIANT_CLASS_NAMES;
}

const BadgeMetadata = ({
  variant = 'blue',
  className,
  ...props
}: BadgeMetadataProps) => {
  return (
    <span
      className={cn(
        'inline-flex h-6 items-center rounded-full px-2.5 text-label-12 whitespace-nowrap',
        VARIANT_CLASS_NAMES[variant],
        className,
      )}
      {...props}
    />
  );
};

export default BadgeMetadata;
