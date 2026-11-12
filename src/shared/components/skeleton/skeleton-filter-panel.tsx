// [스펙] SkeletonFilterPanel
// 역할   : 검색 필터 패널의 항목이 오기 전 자리
// props  : className - 크기 · 여백을 바깥에서 지정
// 구조   : 세로 상자 안에 [line] [line] [surface 가로 꽉] [가로 행: surface 2개] ×4 [빈 공간] [surface 가로 꽉, 바닥에 붙음]
// 스타일 : 276×456, 배경 surface-blue-subtle, 테두리 border-default, 모서리 12, 안쪽 여백 16, 간격 12
// 사용처 : 검색 페이지 필터 패널 처음 불러올 때만 표시. 재검색 중에는 기존 패널 유지
// 접근성 : 상자 전체 aria-hidden. 로딩 안내는 부모 영역이 aria-busy로 담당

import type { ComponentProps } from 'react';

import SkeletonBlock from '@/shared/components/skeleton/skeleton-block';
import { cn } from '@/shared/utils/cn';

const FILTER_CHIP_ROW_WIDTHS = [
  ['w-18', 'w-24'],
  ['w-22', 'w-16'],
  ['w-18', 'w-24'],
  ['w-22', 'w-16'],
];

const SkeletonFilterPanel = ({
  className,
  ...props
}: ComponentProps<'div'>) => {
  return (
    <div
      aria-hidden
      className={cn(
        'flex h-114 w-69 flex-col gap-3 rounded-xl border border-border-default bg-surface-blue-subtle p-4',
        className,
      )}
      {...props}
    >
      <SkeletonBlock className="h-4 w-22" />
      <SkeletonBlock className="h-2.5 w-42" />
      <SkeletonBlock shape="surface" className="h-5 w-full" />
      {FILTER_CHIP_ROW_WIDTHS.map(([first, second], index) => (
        <div key={index} className="flex h-3 gap-2">
          <SkeletonBlock shape="surface" className={cn('h-full', first)} />
          <SkeletonBlock shape="surface" className={cn('h-full', second)} />
        </div>
      ))}
      <SkeletonBlock shape="surface" className="mt-auto h-11 w-full" />
    </div>
  );
};

export default SkeletonFilterPanel;
