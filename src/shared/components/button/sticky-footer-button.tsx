// [스펙] StickyFooterButton
// 역할   : 스티키 허브 맨 아래 텍스트 버튼. 허브에서 2개를 나란히 두고 사이에 구분선
// props  : children - 버튼 문구
//          className, 나머지 button 속성 통과 (onClick은 페이지에서 연결)
// 구조   : 높이 44, 흰 글자 14 Medium, 배경 없음. 구분선은 허브가 그림
// 접근성 : button 태그 + type="button"

import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

const StickyFooterButton = ({
  className,
  ...props
}: ComponentProps<'button'>) => {
  return (
    <button
      type="button"
      className={cn(
        'flex h-11 flex-1 items-center justify-center text-label-14 whitespace-nowrap text-white',
        className,
      )}
      {...props}
    />
  );
};

export default StickyFooterButton;
