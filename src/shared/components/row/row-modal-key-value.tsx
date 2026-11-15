import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

// 페이지 연결: 왼쪽 이름은 label, 오른쪽 내용은 value입니다.
// 기본값은 피그마 예시 문구입니다.
interface RowModalKeyValueProps extends ComponentProps<'div'> {
  label?: string;
  value?: string;
}

const RowModalKeyValue = ({
  label = '항목',
  value = '내용',
  className,
  ...props
}: RowModalKeyValueProps) => {
  return (
    <div
      className={cn(
        'flex h-10 w-full items-center justify-between border-b border-border-default',
        className,
      )}
      {...props}
    >
      <p className="w-40 shrink-0 text-body-14 text-text-secondary">{label}</p>
      <p className="min-w-0 flex-1 text-right text-label-14 text-text-primary">
        {value}
      </p>
    </div>
  );
};

export default RowModalKeyValue;
