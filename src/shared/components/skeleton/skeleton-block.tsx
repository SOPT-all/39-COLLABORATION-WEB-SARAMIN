// [스펙] SkeletonBlock
// 역할   : 데이터가 오기 전 자리에 깔아 두는 회색 블록
// props  : shape ('line' | 'surface' | 'circle', 기본 'line') - 모서리 모양
//          className - 크기 · 여백을 바깥에서 지정
// 상태   : line 글자 자리 / surface 이미지 · 버튼 자리 / circle 로고 · 아바타 자리
// 구조   : div 하나 (블록 요소)
// 사용처 : 같은 폴더의 화면별 스켈레톤 7종이 조립해서 사용. 페이지가 직접 쓰지 않음
// 접근성 : 블록 자체는 aria-hidden. 로딩 안내는 부모 영역이 aria-busy로 담당

import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

// line: 글자 자리 / surface: 이미지 · 버튼 자리 / circle: 로고 · 아바타 자리
const SHAPE_CLASS_NAMES = {
  line: 'rounded-md',
  surface: 'rounded-lg',
  circle: 'rounded-full',
};

interface SkeletonBlockProps extends ComponentProps<'div'> {
  shape?: keyof typeof SHAPE_CLASS_NAMES;
}

// SkeletonBlock : 데이터가 오기 전 자리에 깔아 두는 회색 덩어리. 크기는 쓰는 쪽에서 className으로 준다
const SkeletonBlock = ({
  shape = 'line',
  className,
  ...props
}: SkeletonBlockProps) => {
  return (
    <div
      aria-hidden
      className={cn(
        'shrink-0 animate-pulse bg-surface-subtle',
        SHAPE_CLASS_NAMES[shape],
        className,
      )}
      {...props}
    />
  );
};

export default SkeletonBlock;
