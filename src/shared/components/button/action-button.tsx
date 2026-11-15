import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

// 페이지 연결: 문구는 children, 클릭은 onClick입니다.
const ActionButton = ({
  className,
  type = 'button',
  children = '필터 초기화',
  ...props
}: ComponentProps<'button'>) => {
  return (
    <button
      type={type}
      className={cn(
        'flex h-8 w-24 shrink-0 items-center justify-center rounded-md border border-border-default bg-surface-default px-3 text-body-12 whitespace-nowrap text-blue-90',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default ActionButton;
