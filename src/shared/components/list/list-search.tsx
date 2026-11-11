import type { ComponentProps } from 'react';

import RowKeywordSearch from '@/shared/components/row/row-keyword-search';
import { cn } from '@/shared/utils/cn';

interface SearchKeywordGroup {
  title: string;
  keywords: string[];
}

// 페이지 연결: 묶음은 groups, 칩 클릭은 onSelect입니다.
// groups 기본값은 피그마 예시 데이터입니다.
interface ListSearchProps extends ComponentProps<'div'> {
  groups?: SearchKeywordGroup[];
  onSelect?: (keyword: string) => void;
}

const defaultGroups: SearchKeywordGroup[] = [
  { title: '카테고리 타이틀', keywords: ['Figma', 'Figma', 'Figma'] },
  { title: '카테고리 타이틀', keywords: ['Figma', 'Figma', 'Figma'] },
];

const ListSearch = ({
  groups = defaultGroups,
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
        {groups.map((group, groupIndex) => (
          <section
            key={`${group.title}-${groupIndex}`}
            className="flex w-full flex-col pt-3"
          >
            <h3 className="px-4 py-1 text-label-12 text-blue-50">
              {group.title}
            </h3>
            <div className="flex flex-col items-center gap-2">
              <div className="h-px w-[210px] bg-blue-30" />
              <div className="flex w-full flex-col">
                {group.keywords.map((keyword, keywordIndex) => (
                  <RowKeywordSearch
                    key={`${keyword}-${keywordIndex}`}
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
