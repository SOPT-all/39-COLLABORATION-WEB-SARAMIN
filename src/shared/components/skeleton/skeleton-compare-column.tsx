// [스펙] SkeletonCompareColumn
// 역할   : 비교 모달에서 공고 한 열의 데이터가 오기 전 자리
// props  : className - 크기 · 여백을 바깥에서 지정
// 구조   : 세로 상자 안에 [가로 행: circle + 세로 상자(line 2개)] [세로 상자: 짧은 line + 긴 line] ×5
// 스타일 : 296×420, 테두리 border-default, 모서리 8, 안쪽 여백 16, 간격 12 / 필드 간격 8
// 사용처 : 비교 모달에서 선택한 공고 열마다 따로 표시. 모달 틀은 유지
// 접근성 : 상자 전체 aria-hidden. 로딩 안내는 부모 영역이 aria-busy로 담당

import type { ComponentProps } from 'react';

import SkeletonBlock from '@/shared/components/skeleton/skeleton-block';
import { cn } from '@/shared/utils/cn';

const COMPARE_FIELD_WIDTHS = [
  { label: 'w-16', value: 'w-39' },
  { label: 'w-18', value: 'w-44' },
  { label: 'w-14', value: 'w-32' },
  { label: 'w-20', value: 'w-41' },
  { label: 'w-17', value: 'w-35' },
];

const SkeletonCompareColumn = ({
  className,
  ...props
}: ComponentProps<'div'>) => {
  return (
    <div
      aria-hidden
      className={cn(
        'flex h-105 w-74 flex-col gap-3 rounded-lg border border-border-default bg-surface-default p-4',
        className,
      )}
      {...props}
    >
      <div className="flex w-full items-center gap-3">
        <SkeletonBlock shape="circle" className="size-10" />
        <div className="flex flex-1 flex-col gap-2">
          <SkeletonBlock className="h-3 w-36" />
          <SkeletonBlock className="h-2 w-24" />
        </div>
      </div>
      {COMPARE_FIELD_WIDTHS.map(({ label, value }, index) => (
        <div key={index} className="flex flex-col gap-2">
          <SkeletonBlock className={cn('h-2', label)} />
          <SkeletonBlock className={cn('h-3', value)} />
        </div>
      ))}
    </div>
  );
};

export default SkeletonCompareColumn;
