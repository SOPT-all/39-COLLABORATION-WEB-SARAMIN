import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

const TOTAL_KEYWORD_COUNT = 3;

interface BadgeMatchProps extends Omit<ComponentProps<'span'>, 'children'> {
  matchCount: number;
}

const BadgeMatch = ({ matchCount, className, ...props }: BadgeMatchProps) => {
  return (
    <span
      className={cn(
        'inline-flex rounded-lg bg-[#F2F6FF] px-2 py-1 text-center text-label-14 whitespace-nowrap text-[#2D67FF]',
        className,
      )}
      {...props}
    >
      내 키워드 {matchCount}/{TOTAL_KEYWORD_COUNT} 일치
    </span>
  );
};

export default BadgeMatch;
