import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

interface BadgeMatchProps extends Omit<ComponentProps<'span'>, 'children'> {
  matchCount: number;
  keywordCount: number;
}

const BadgeMatch = ({
  matchCount,
  keywordCount,
  className,
  ...props
}: BadgeMatchProps) => {
  return (
    <span
      className={cn(
        'inline-flex rounded-lg bg-[#F2F6FF] px-2 py-1 text-center text-label-14 whitespace-nowrap text-[#2D67FF]',
        className,
      )}
      {...props}
    >
      내 키워드 {matchCount}/{keywordCount} 일치
    </span>
  );
};

export default BadgeMatch;
