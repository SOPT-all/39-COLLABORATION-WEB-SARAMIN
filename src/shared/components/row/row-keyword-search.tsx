import type { ComponentProps } from 'react';

import ChipKeyword from '@/shared/components/chip/chip-keyword';
import { cn } from '@/shared/utils/cn';

// 페이지 연결: 키워드 문구는 keyword, 클릭은 onClick입니다.
// keyword 기본값은 피그마 예시 문구입니다.
interface RowKeywordSearchProps extends ComponentProps<'button'> {
  keyword?: string;
}

const RowKeywordSearch = ({
  keyword = 'Figma',
  className,
  type = 'button',
  ...props
}: RowKeywordSearchProps) => {
  return (
    <button
      type={type}
      className={cn(
        'flex w-full flex-col items-start justify-center px-4 py-1',
        className,
      )}
      {...props}
    >
      <ChipKeyword keyword={keyword} className="max-w-full" />
    </button>
  );
};

export default RowKeywordSearch;
