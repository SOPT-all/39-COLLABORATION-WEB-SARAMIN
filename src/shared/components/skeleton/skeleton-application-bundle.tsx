// [스펙] SkeletonApplicationBundle
// 역할   : 지원 패키지 카드의 데이터가 오기 전 자리
// props  : className - 크기 · 여백을 바깥에서 지정 (내용은 피그마 고정이라 다른 props 없음)
// 구조   : 가로 배치 상자 안에 [surface] [세로 상자: line 2개] [surface]
// 스타일 : 244×80, 테두리 border-default, 모서리 8, 안쪽 여백 12, 간격 12 / 세로 상자 간격 8
// 사용처 : 홈 · 스티키 허브에서 지원 패키지 카드 로딩 중에 표시
// 접근성 : 상자 전체 aria-hidden. 로딩 안내는 부모 영역이 aria-busy로 담당

import type { ComponentProps } from 'react';

import SkeletonBlock from '@/shared/components/skeleton/skeleton-block';
import { cn } from '@/shared/utils/cn';

const SkeletonApplicationBundle = ({
  className,
  ...props
}: ComponentProps<'div'>) => {
  return (
    <div
      aria-hidden
      className={cn(
        'flex h-20 w-61 items-center gap-3 rounded-lg border border-border-default bg-surface-default p-3',
        className,
      )}
      {...props}
    >
      <SkeletonBlock shape="surface" className="h-10 w-8" />
      <div className="flex flex-1 flex-col gap-2">
        <SkeletonBlock className="h-3 w-28" />
        <SkeletonBlock className="h-2 w-21" />
      </div>
      <SkeletonBlock shape="surface" className="h-10 w-6" />
    </div>
  );
};

export default SkeletonApplicationBundle;
