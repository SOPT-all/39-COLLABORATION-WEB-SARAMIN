import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

// 버튼은 ModalButton을 children으로 넣어요. 1개면 single, 2개면 dual 레이아웃이 돼요.
const ModalFooter = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={cn(
        'flex h-18 shrink-0 items-center justify-end gap-2 bg-surface-default px-6 py-3',
        className,
      )}
      {...props}
    />
  );
};

export default ModalFooter;
