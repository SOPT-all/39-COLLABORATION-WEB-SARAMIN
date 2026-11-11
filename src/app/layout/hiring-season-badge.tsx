import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

import IcLightning from '@/shared/assets/icons/ic-lightning.svg?react';

// 피그마 원본이 1배 이미지라 흐려서 코드로 다시 그렸어요. (85 × 28, 오른쪽 아래 말풍선 꼬리)
const HiringSeasonBadge = ({ className, ...props }: ComponentProps<'span'>) => {
  return (
    <span className={cn('relative block h-7 w-21.25', className)} {...props}>
      <span className="flex h-5.5 items-center justify-center gap-0.5 rounded-full bg-linear-to-b from-[#7340FF] to-[#3453FF] text-label-12 whitespace-nowrap text-white">
        하반기 공채
        <IcLightning aria-hidden className="shrink-0" />
      </span>
      <span
        aria-hidden
        className="absolute top-5 right-1 h-1.75 w-2 bg-[#3453FF] [clip-path:polygon(0_0,100%_0,30%_100%)]"
      />
    </span>
  );
};

export default HiringSeasonBadge;
