import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

import IcBookmark from '@/shared/assets/icons/ic-bookmark.svg?react';

interface BookmarkButtonProps extends ComponentProps<'button'> {
  isSelected?: boolean;
}

const ICON_CLASS_NAMES = {
  default:
    'fill-white/0 text-gray-70 group-hover:fill-blue-30 group-hover:text-blue-30 group-focus-visible:fill-blue-30 group-focus-visible:text-blue-30',
  selected: 'fill-blue-70 text-blue-70',
};

const BookmarkButton = ({
  isSelected = false,
  className,
  'aria-label': ariaLabel = '북마크',
  ...props
}: BookmarkButtonProps) => {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-pressed={isSelected}
      className={cn('group', className)}
      {...props}
    >
      <IcBookmark
        aria-hidden
        className={cn(
          'transition-colors',
          ICON_CLASS_NAMES[isSelected ? 'selected' : 'default'],
        )}
      />
    </button>
  );
};

export default BookmarkButton;
