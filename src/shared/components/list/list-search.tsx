import type { ComponentProps } from 'react';

import RowKeywordSearch from '@/shared/components/row/row-keyword-search';
import { cn } from '@/shared/utils/cn';

interface SearchKeywordGroup {
  title: string;
  keywords: string[];
}

// 페이지 연결: 묶음은 groups, 칩 클릭은 onSelect입니다.
// groups 기본값은 피그마 예시 데이터입니다.
interface ListSearchProps extends Omit<ComponentProps<'div'>, 'onSelect'> {
  groups?: SearchKeywordGroup[];
  onSelect?: (keyword: string) => void;
}

const DEFAULT_GROUPS: SearchKeywordGroup[] = [
  { title: '디자인 툴', keywords: ['Figma', 'Sketch', 'Adobe XD'] },
  { title: '디자인 직무', keywords: ['UX', 'UI', '프로덕트 디자인'] },
];

const ListSearch = ({
  groups = DEFAULT_GROUPS,
  onSelect,
  className,
  ...props
}: ListSearchProps) => {
  return (
    <div
      className={cn(
        'w-full rounded-lg border border-blue-40 bg-white',
        className,
      )}
      {...props}
    >
      <div className="flex flex-col pb-6">
        {groups.map((group) => (
          <section key={group.title} className="flex w-full flex-col pt-3">
            <h3 className="px-4 py-1 text-label-12 text-blue-50">
              {group.title}
            </h3>
            <div className="flex flex-col items-center gap-2">
              <div className="h-px w-52.5 bg-blue-30" />
              <div className="flex w-full flex-col">
                {group.keywords.map((keyword) => (
                  <RowKeywordSearch
                    key={keyword}
                    keyword={keyword}
                    onClick={() => onSelect?.(keyword)}
                  />
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default ListSearch;
