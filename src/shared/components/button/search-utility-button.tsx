import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

const SearchUtilityButton = ({
  className,
  ...props
}: ComponentProps<'button'>) => {
  return (
    <button
      type="button"
      className={cn(
        'flex h-8 w-27.5 items-center justify-center border border-[#E5E8EB] bg-white text-caption-12 whitespace-nowrap text-[#8B95A1]',
        className,
      )}
      {...props}
    />
  );
};

export default SearchUtilityButton;
