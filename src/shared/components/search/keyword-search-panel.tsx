import type { ComponentProps } from 'react';

import MyfitSearchButton from '@/shared/components/button/myfit-search-button';
import ChipKeyword from '@/shared/components/chip/chip-keyword';
import KeywordInput from '@/shared/components/search/keyword-input';
import SkeletonFilterPanel from '@/shared/components/skeleton/skeleton-filter-panel';
import { cn } from '@/shared/utils/cn';

type KeywordSearchPanelState = 'loaded' | 'loading';

// 페이지 연결: keywords에 선택된 키워드를 넘기고, 칩의 X는 onRemove로 목록에서 빼야 사라집니다.
// 입력 중인 글자는 keyword와 onKeywordChange, 검색하기 클릭은 onSearch입니다.
// 입력값을 칩으로 추가하는 처리는 이 컴포넌트에 없고, 페이지에서 keywords에 넣으면 됩니다.
// 로딩(state="loading")은 SkeletonFilterPanel을 보여 줍니다. 폭은 부모에 맞춥니다.
interface KeywordSearchPanelProps extends Omit<
  ComponentProps<'section'>,
  'children' | 'onChange'
> {
  state?: KeywordSearchPanelState;
  title?: string;
  description?: string;
  keywords: string[];
  keyword?: string;
  onKeywordChange?: (keyword: string) => void;
  onRemove?: (keyword: string) => void;
  onSearch?: () => void;
}

const KeywordSearchPanel = ({
  state = 'loaded',
  title = 'MY FIT',
  description = '내 키워드로 맞춤 공고 찾기',
  keywords,
  keyword = '',
  onKeywordChange,
  onRemove,
  onSearch,
  className,
  ...props
}: KeywordSearchPanelProps) => {
  if (state === 'loading') {
    return (
      <section
        aria-busy="true"
        aria-label="키워드를 불러오는 중"
        className={cn('w-full', className)}
        {...props}
      >
        <SkeletonFilterPanel className="w-full" />
      </section>
    );
  }

  return (
    <section
      className={cn(
        'flex w-full flex-col gap-12 rounded-xl border border-border-default bg-surface-blue-subtle p-4 shadow-card',
        className,
      )}
      {...props}
    >
      <div className="flex w-full flex-col gap-5">
        <div className="flex flex-col">
          <h2 className="text-heading-20 text-text-primary">{title}</h2>
          <p className="text-body-14 text-text-secondary">{description}</p>
        </div>
        <div className="flex w-full flex-col gap-4.5">
          <KeywordInput keyword={keyword} onKeywordChange={onKeywordChange} />
          <div className="flex flex-wrap gap-2">
            {keywords.map((item) => (
              <ChipKeyword
                key={item}
                keyword={item}
                onRemove={() => onRemove?.(item)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col gap-2">
        <p className="text-center text-caption-12 text-text-secondary">
          키워드 {keywords.length}개 선택됨
        </p>
        <MyfitSearchButton className="w-full" onClick={onSearch} />
      </div>
    </section>
  );
};

export default KeywordSearchPanel;
