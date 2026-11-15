// [스펙] SkeletonModalRow
// 역할   : 서류 · 지원 내역 목록 한 행(88px)의 데이터가 오기 전 자리
// props  : className - 크기 · 여백을 바깥에서 지정
// 구조   : 가로 상자 안에 [surface] [세로 상자: line 2개] [알약 모양 surface]
// 스타일 : 672×88, 테두리 border-default, 모서리 12, 안쪽 여백 16, 간격 12
//          가운데 막대 2개는 피그마가 더 진한 회색(border-default)이라 색을 덮어씀
// 사용처 : 모달 안 서류 · 지원 내역 목록에서 행 개수만큼 반복 표시
// 접근성 : 상자 전체 aria-hidden. 로딩 안내는 부모 영역이 aria-busy로 담당

import type { ComponentProps } from 'react';

import SkeletonBlock from '@/shared/components/skeleton/skeleton-block';
import { cn } from '@/shared/utils/cn';

const SkeletonModalRow = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      aria-hidden
      className={cn(
        'flex h-22 w-168 items-center gap-3 rounded-xl border border-border-default bg-surface-default p-4',
        className,
      )}
      {...props}
    >
      <SkeletonBlock shape="surface" className="size-10" />
      <div className="flex flex-1 flex-col gap-2">
        <SkeletonBlock shape="circle" className="h-3 w-60 bg-border-default" />
        <SkeletonBlock
          shape="circle"
          className="h-2.5 w-40 bg-border-default"
        />
      </div>
      <SkeletonBlock shape="circle" className="h-6 w-16" />
    </div>
  );
};

export default SkeletonModalRow;
