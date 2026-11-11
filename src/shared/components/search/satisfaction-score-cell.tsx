import type { ComponentProps } from 'react';

import ChipNumber from '@/shared/components/chip/chip-number';
import { cn } from '@/shared/utils/cn';

// 페이지 연결: 점수는 score, 클릭은 onClick입니다. 0~10을 map으로 11칸 그리면 됩니다.
// 색과 글자가 같은 ChipNumber에 크기만 피그마(78x44)로 바꿔 썼습니다.
interface SatisfactionScoreCellProps extends Omit<
  ComponentProps<'button'>,
  'children'
> {
  score: number;
}

const SatisfactionScoreCell = ({
  score,
  className,
  ...props
}: SatisfactionScoreCellProps) => {
  return (
    <ChipNumber className={cn('h-11 w-[78px]', className)} {...props}>
      {score}
    </ChipNumber>
  );
};

export default SatisfactionScoreCell;
