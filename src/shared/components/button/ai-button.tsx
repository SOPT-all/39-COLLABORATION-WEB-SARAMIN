import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

import IcSparkle from '@/shared/assets/icons/ic-sparkle.svg?react';

const AiButton = ({ className, ...props }: ComponentProps<'button'>) => {
  return (
    <button
      type="button"
      className={cn(
        'relative flex h-10 w-21.5 items-center overflow-hidden rounded-full bg-[linear-gradient(87.85deg,#00A1F8_1.61%,#7F38FD_98.39%)] pr-1.25 pl-3 text-title-14 whitespace-nowrap text-white shadow-[0_0_10px_0_rgba(0,161,248,0.3)]',
        className,
      )}
      {...props}
    >
      <span
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(87.85deg,#7F38FD_1.61%,#00A1F8_98.39%)] opacity-95"
      />
      <IcSparkle aria-hidden className="relative shrink-0" />
      <span className="relative flex-1 text-center">AI 검색</span>
    </button>
  );
};

export default AiButton;
