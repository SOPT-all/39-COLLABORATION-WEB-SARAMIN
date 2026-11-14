// [스펙] SkeletonStickyHub
// 역할   : "나의 취업 in" 스티키 허브의 사용자 데이터가 오기 전 자리
// props  : className - 크기 · 여백을 바깥에서 지정
// 구조   : 파란 세로 상자 안에 [line 2개] [흰 가로 행: circle + 세로 상자(line 2개)] ×3 [SkeletonApplicationBundle]
// 스타일 : 244×430, 배경 blue-90, 모서리 12, 안쪽 여백 16, 간격 12 / 행 212×64, 모서리 8, 여백 12
//          위 막대 2개는 파란 배경 위라 투명도 72% · 48%
// 사용처 : 홈에서 스티키 허브 로딩 중에 표시
// 접근성 : 상자 전체 aria-hidden. 로딩 안내는 부모 영역이 aria-busy로 담당

import type { ComponentProps } from 'react';

import SkeletonApplicationBundle from '@/shared/components/skeleton/skeleton-application-bundle';
import SkeletonBlock from '@/shared/components/skeleton/skeleton-block';
import { cn } from '@/shared/utils/cn';

const HUB_ROW_COUNT = 3;

const SkeletonStickyHub = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      aria-hidden
      className={cn(
        'flex h-107.5 w-61 flex-col gap-3 rounded-xl bg-blue-90 p-4',
        className,
      )}
      {...props}
    >
      <SkeletonBlock className="h-4 w-30 opacity-72" />
      <SkeletonBlock className="h-2.5 w-46 opacity-48" />
      {Array.from({ length: HUB_ROW_COUNT }, (_, index) => (
        <div
          key={index}
          className="flex h-16 w-full items-center gap-3 rounded-lg bg-surface-default p-3"
        >
          <SkeletonBlock shape="circle" className="size-6" />
          <div className="flex flex-1 flex-col gap-2">
            <SkeletonBlock className="h-2.5 w-26" />
            <SkeletonBlock className="h-2 w-18" />
          </div>
        </div>
      ))}
      <SkeletonApplicationBundle className="h-17.5 w-full" />
    </div>
  );
};

export default SkeletonStickyHub;
