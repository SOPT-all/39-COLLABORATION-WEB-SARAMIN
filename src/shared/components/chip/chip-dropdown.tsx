import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

import IcChevronDown from '@/shared/assets/icons/ic-chevron-down.svg?react';

const ChipDropdown = ({
  className,
  children,
  ...props
}: ComponentProps<'button'>) => {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex h-7 items-center rounded-full border border-gray-30 pr-1 pl-2 text-[13px] font-bold whitespace-nowrap text-gray-110',
        className,
      )}
      {...props}
    >
      {children}
      <IcChevronDown aria-hidden className="shrink-0" />
    </button>
  );
};

export default ChipDropdown;
