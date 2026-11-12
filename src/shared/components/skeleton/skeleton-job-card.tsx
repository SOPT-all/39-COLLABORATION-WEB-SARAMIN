// [스펙] SkeletonJobCard
// 역할   : 홈 공고 카드의 데이터가 오기 전 자리
// props  : className - 크기 · 여백을 바깥에서 지정
// 구조   : 세로 상자 안에 [가로 행: circle + 세로 상자(line 2개) + circle] [line] [line] [가로 행: surface 3개] [가로 행: line 양끝 2개]
// 스타일 : 472×252, 테두리 border-default, 모서리 12, 안쪽 여백 16, 간격 12
// 사용처 : 홈 공고 목록에서 카드 개수만큼 반복 표시
// 접근성 : 상자 전체 aria-hidden. 로딩 안내는 부모 영역이 aria-busy로 담당

import type { ComponentProps } from 'react';

import SkeletonBlock from '@/shared/components/skeleton/skeleton-block';
import { cn } from '@/shared/utils/cn';

const JOB_TAG_WIDTHS = ['w-20', 'w-16', 'w-18'];

const SkeletonJobCard = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      aria-hidden
      className={cn(
        'flex h-63 w-118 flex-col gap-3 rounded-xl border border-border-default bg-surface-default p-4',
        className,
      )}
      {...props}
    >
      <div className="flex w-full items-center gap-3">
        <SkeletonBlock shape="circle" className="size-10" />
        <div className="flex flex-1 flex-col gap-2">
          <SkeletonBlock className="h-2.5 w-34" />
          <SkeletonBlock className="h-2 w-23" />
        </div>
        <SkeletonBlock shape="circle" className="size-6" />
      </div>
      <SkeletonBlock className="h-4 w-80" />
      <SkeletonBlock className="h-3 w-60" />
      <div className="flex gap-2">
        {JOB_TAG_WIDTHS.map((width, index) => (
          <SkeletonBlock
            key={index}
            shape="surface"
            className={cn('h-6', width)}
          />
        ))}
      </div>
      <div className="flex w-full items-center justify-between">
        <SkeletonBlock className="h-2.5 w-30" />
        <SkeletonBlock className="h-2.5 w-22" />
      </div>
    </div>
  );
};

export default SkeletonJobCard;
