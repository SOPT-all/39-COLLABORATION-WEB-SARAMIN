import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

const VARIANT_CLASS_NAMES = {
  primary: 'border-[1.5px] border-blue-90 bg-surface-blue-subtle text-blue-90',
  secondary:
    'border border-border-default bg-surface-default text-text-secondary',
};

interface ChipSelectedFilterProps extends ComponentProps<'div'> {
  children: string;
  variant?: keyof typeof VARIANT_CLASS_NAMES;
  onRemove: () => void;
}

const ChipSelectedFilter = ({
  children,
  variant = 'primary',
  onRemove,
  className,
  ...props
}: ChipSelectedFilterProps) => {
  return (
    <div
      className={cn(
        'inline-flex h-8 items-center justify-center rounded-2xl px-3 py-1.75 text-center text-label-14 whitespace-nowrap',
        VARIANT_CLASS_NAMES[variant],
        className,
      )}
      {...props}
    >
      <span>
        검색어 · {children}{' '}
        <button
          type="button"
          aria-label={`${children} 삭제`}
          onClick={onRemove}
        >
          ×
        </button>
      </span>
    </div>
  );
};

export default ChipSelectedFilter;
