// [스펙] SkeletonSearchResultItem
// 역할   : 검색 결과 한 행의 데이터가 오기 전 자리
// props  : className - 크기 · 여백을 바깥에서 지정
// 구조   : 가로 상자 안에 [circle] [세로 상자: line 3개 + 가로 행(surface 3개)] [세로 상자(오른쪽 정렬): surface + line]
// 스타일 : 914×164, 아래쪽 테두리만 border-default, 안쪽 여백 16, 간격 16 / 세로 상자 간격 12
// 사용처 : 검색 페이지 결과 목록에서 행 개수만큼 반복 표시
// 접근성 : 상자 전체 aria-hidden. 로딩 안내는 부모 영역이 aria-busy로 담당

import type { ComponentProps } from 'react';

import SkeletonBlock from '@/shared/components/skeleton/skeleton-block';
import { cn } from '@/shared/utils/cn';

const RESULT_TAG_WIDTHS = ['w-18', 'w-22', 'w-16'];

const SkeletonSearchResultItem = ({
  className,
  ...props
}: ComponentProps<'div'>) => {
  return (
    <div
      aria-hidden
      className={cn(
        'flex h-41 w-228.5 items-start gap-4 border-b border-border-default bg-surface-default p-4',
        className,
      )}
      {...props}
    >
      <SkeletonBlock shape="circle" className="size-10" />
      <div className="flex flex-1 flex-col gap-3">
        <SkeletonBlock className="h-3 w-55" />
        <SkeletonBlock className="h-4 w-115" />
        <SkeletonBlock className="h-3 w-90" />
        <div className="flex gap-2">
          {RESULT_TAG_WIDTHS.map((width, index) => (
            <SkeletonBlock
              key={index}
              shape="surface"
              className={cn('h-6', width)}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-end gap-3">
        <SkeletonBlock shape="surface" className="h-8 w-18" />
        <SkeletonBlock className="h-3 w-24" />
      </div>
    </div>
  );
};

export default SkeletonSearchResultItem;
