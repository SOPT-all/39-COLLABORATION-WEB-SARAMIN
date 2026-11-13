// [스펙] ReadinessSummary
// 역할   : 스티키 허브 위쪽의 준비 상태 요약. 서류가 다 됐는지 한눈에 보여줌
// props  : tone - ready · warning (기본 ready). ready는 파란 ✓, warning은 코랄 !
//          title · description - 문구. 기본값 '필수 서류 3/3 준비' · '최근 업데이트 10분 전'
//          className, 나머지 div 속성 통과
// 구조   : [36px 원 아이콘] [title / description] [ChipStickyReview '검토 ON']
// 재사용 : 주형 님 ChipStickyReview
// 접근성 : ✓ · ! 아이콘은 장식이라 aria-hidden. 상태는 문구가 읽어 줌

import type { ComponentProps } from 'react';

import ChipStickyReview from '@/shared/components/chip/chip-sticky-review';
import { cn } from '@/shared/utils/cn';

const TONE_STATES = {
  ready: { icon: '✓', className: 'bg-blue-30 text-blue-90' },
  warning: { icon: '!', className: 'bg-coral-30 text-coral-120' },
};

interface ReadinessSummaryProps extends ComponentProps<'div'> {
  tone?: keyof typeof TONE_STATES;
  title?: string;
  description?: string;
}

const ReadinessSummary = ({
  tone = 'ready',
  title = '필수 서류 3/3 준비',
  description = '최근 업데이트 10분 전',
  className,
  ...props
}: ReadinessSummaryProps) => {
  const { icon, className: iconClassName } = TONE_STATES[tone];

  return (
    <div
      className={cn(
        'flex h-17 w-61 items-center gap-2.5 rounded-xl bg-surface-default p-2.5',
        className,
      )}
      {...props}
    >
      <span
        aria-hidden
        className={cn(
          'flex size-9 shrink-0 items-center justify-center rounded-full text-title-16',
          iconClassName,
        )}
      >
        {icon}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-px">
        <p className="truncate text-label-14 text-text-primary">{title}</p>
        <p className="truncate text-caption-11 text-text-secondary">
          {description}
        </p>
      </div>
      <ChipStickyReview>검토 ON</ChipStickyReview>
    </div>
  );
};

export default ReadinessSummary;
