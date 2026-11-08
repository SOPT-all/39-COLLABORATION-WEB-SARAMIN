import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

interface ChipNumberProps extends ComponentProps<'button'> {
  isSelected?: boolean;
}

const ChipNumber = ({
  isSelected = false,
  className,
  ...props
}: ChipNumberProps) => {
  return (
    <button
      type="button"
      aria-current={isSelected ? 'page' : undefined}
      className={cn(
        'flex size-8 items-center justify-center border border-[#E5E8EB] bg-white text-center text-body-14',
        isSelected ? 'text-[#17191C]' : 'text-[#5C6470]',
        className,
      )}
      {...props}
    />
  );
};

export default ChipNumber;
