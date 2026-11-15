// [스펙] LoaderBar
// 역할   : 결과를 백그라운드에서 다시 불러올 때 기존 내용 위에 띄우는 얇은 진행 바
// props  : className - 너비 · 위치를 바깥에서 지정. aria-label - 읽어 줄 문구 (기본 '불러오는 중')
// 구조   : 회색 바탕 바 안에 파란 진행 막대 하나
// 스타일 : 높이 4, 바탕 surface-subtle, 진행 막대 blue-90 280px, 모서리 2
// 사용처 : 검색 페이지 등에서 재검색 중 표시. 기존 결과는 그대로 둠
// 접근성 : 스켈레톤과 달리 그 자체가 로딩 안내라 role="progressbar"로 읽힘

import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

const LoaderBar = ({
  className,
  'aria-label': ariaLabel = '불러오는 중',
  ...props
}: ComponentProps<'div'>) => {
  return (
    <div
      role="progressbar"
      aria-label={ariaLabel}
      className={cn(
        'h-1 w-full overflow-hidden rounded-xs bg-surface-subtle',
        className,
      )}
      {...props}
    >
      <div className="h-full w-70 animate-pulse rounded-xs bg-blue-90" />
    </div>
  );
};

export default LoaderBar;
