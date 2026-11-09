import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

import IcRemove from '@/shared/assets/icons/ic-remove.svg?react';

interface ChipKeywordProps extends Omit<ComponentProps<'div'>, 'children'> {
  keyword: string;
  onRemove: () => void;
}

const ChipKeyword = ({
  keyword,
  onRemove,
  className,
  ...props
}: ChipKeywordProps) => {
  return (
    <div
      className={cn(
        'inline-flex h-9.5 items-center gap-1 rounded-lg border border-blue-90 bg-white p-2',
        className,
      )}
      {...props}
    >
      <span className="min-w-0 truncate text-label-14 text-[#2D67FF]">
        {keyword}
      </span>
      <button
        type="button"
        aria-label={`${keyword} 삭제`}
        className="size-6 shrink-0"
        onClick={onRemove}
      >
        <IcRemove aria-hidden />
      </button>
    </div>
  );
};

export default ChipKeyword;
