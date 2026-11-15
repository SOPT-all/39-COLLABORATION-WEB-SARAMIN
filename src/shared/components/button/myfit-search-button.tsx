import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

import IcBookmark from '@/shared/assets/icons/ic-bookmark.svg?react';

interface MyfitSearchButtonProps extends ComponentProps<'button'> {
  resultCount?: number;
}

const MyfitSearchButton = ({
  resultCount,
  className,
  ...props
}: MyfitSearchButtonProps) => {
  const hasResult = resultCount !== undefined;

  return (
    <button
      type="button"
      className={cn(
        'flex h-11.5 w-47 items-center justify-center gap-1 rounded-lg bg-[#2D67FF] px-5 py-3 text-center text-label-14 whitespace-nowrap text-white',
        className,
      )}
      {...props}
    >
      {hasResult && (
        <IcBookmark aria-hidden className="shrink-0 fill-white text-white" />
      )}
      검색하기
      {hasResult && (
        <span className="text-body-12 text-blue-30">{resultCount}개</span>
      )}
    </button>
  );
};

export default MyfitSearchButton;
