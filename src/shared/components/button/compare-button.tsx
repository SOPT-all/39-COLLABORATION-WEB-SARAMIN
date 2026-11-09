import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

const VARIANT_CLASS_NAMES = {
  primary: 'border-blue-90 bg-[#2D67FF] text-title-14 text-white',
  secondary:
    'border-border-default bg-surface-default text-label-14 text-[#17191C]',
};

interface CompareButtonProps extends ComponentProps<'button'> {
  variant?: keyof typeof VARIANT_CLASS_NAMES;
}

const CompareButton = ({
  variant = 'primary',
  className,
  ...props
}: CompareButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        'flex h-11 w-30 items-center justify-center rounded-lg border px-4',
        VARIANT_CLASS_NAMES[variant],
        className,
      )}
      {...props}
    />
  );
};

export default CompareButton;
