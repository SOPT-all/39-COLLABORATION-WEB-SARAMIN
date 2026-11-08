import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

import IcBookmark from '@/shared/assets/icons/ic-bookmark.svg?react';

interface CompareScrapButtonProps extends ComponentProps<'button'> {
  isSaved?: boolean;
}

const CompareScrapButton = ({
  isSaved = false,
  className,
  ...props
}: CompareScrapButtonProps) => {
  return (
    <button
      type="button"
      aria-pressed={isSaved}
      className={cn(
        'flex h-11 w-30 items-center justify-center gap-1.5 rounded-lg border px-4 text-label-14',
        isSaved
          ? 'border-blue-90 bg-[#F2F6FF] text-blue-90'
          : 'border-border-default bg-surface-default text-[#17191C]',
        className,
      )}
      {...props}
    >
      <IcBookmark
        aria-hidden
        className={cn(
          'shrink-0',
          isSaved ? 'fill-blue-70 text-blue-70' : 'text-gray-70',
        )}
      />
      {isSaved ? '스크랩함' : '스크랩'}
    </button>
  );
};

export default CompareScrapButton;
