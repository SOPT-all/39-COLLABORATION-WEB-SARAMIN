import type { ComponentProps, MouseEvent } from 'react';

import { cn } from '@/shared/utils/cn';

const BackToTopButton = ({
  className,
  onClick,
  'aria-label': ariaLabel = '맨 위로 이동',
  ...props
}: ComponentProps<'button'>) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={cn(
        'flex size-9.5 items-center justify-center border border-[#E5E8EB] bg-white text-[26px] leading-6 font-normal text-[#8B95A1]',
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      <span aria-hidden>↑</span>
    </button>
  );
};

export default BackToTopButton;
