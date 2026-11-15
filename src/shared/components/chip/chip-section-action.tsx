import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

import IcChevronRight from '@/shared/assets/icons/ic-chevron-right.svg?react';

const VARIANT_CLASS_NAMES = {
  viewAll: 'w-20.25 rounded-full bg-[#F2F6FF] text-blue-90',
  deadlineAlert:
    'w-21.5 rounded-[7px] border border-border-default bg-surface-default text-text-secondary',
};

interface ChipSectionActionProps extends ComponentProps<'button'> {
  variant?: keyof typeof VARIANT_CLASS_NAMES;
}

const ChipSectionAction = ({
  variant = 'viewAll',
  className,
  children,
  ...props
}: ChipSectionActionProps) => {
  return (
    <button
      type="button"
      className={cn(
        'flex h-7.5 items-center justify-center gap-1 pr-2 pl-2.5 text-center text-label-12 whitespace-nowrap',
        VARIANT_CLASS_NAMES[variant],
        className,
      )}
      {...props}
    >
      {children}
      <IcChevronRight aria-hidden className="shrink-0" />
    </button>
  );
};

export default ChipSectionAction;
