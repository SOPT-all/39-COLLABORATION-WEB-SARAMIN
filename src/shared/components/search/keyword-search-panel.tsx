import type { ComponentProps } from 'react';

import MyfitSearchButton from '@/shared/components/button/myfit-search-button';
import ChipKeyword from '@/shared/components/chip/chip-keyword';
import KeywordInput from '@/shared/components/search/keyword-input';
import { cn } from '@/shared/utils/cn';

type KeywordSearchPanelContext = 'search' | 'compare-background';
type KeywordSearchPanelState = 'loaded' | 'loading';

// 페이지 연결: keywords에 선택된 키워드를 넘기고, 칩의 X는 onRemove로 목록에서 빼야 사라집니다.
// 입력 중인 글자는 keyword와 onKeywordChange, 검색하기 클릭은 onSearch입니다.
// 입력값을 칩으로 추가하는 처리는 이 컴포넌트에 없고, 페이지에서 keywords에 넣으면 됩니다.
interface KeywordSearchPanelProps extends Omit<
  ComponentProps<'section'>,
  'children' | 'onChange'
> {
  context?: KeywordSearchPanelContext;
  state?: KeywordSearchPanelState;
  title?: string;
  description?: string;
  keywords?: string[];
  keyword?: string;
  onKeywordChange?: (keyword: string) => void;
  onRemove?: (keyword: string) => void;
  onSearch?: () => void;
}

// 피그마 예시 키워드입니다. keywords를 넘기면 이 값은 쓰이지 않습니다.
const defaultKeywords = {
  search: [
    'Figma',
    'UX디자인',
    'Adobe XD',
    'UI',
    '프로덕트 디자인',
    'UX',
    '프로토타이핑',
  ],
  'compare-background': [
    'Figma',
    'Figma',
    'Figma',
    'Figma',
    'Figma',
    'Figma',
    'Figma',
  ],
} satisfies Record<KeywordSearchPanelContext, string[]>;

const skeletonChipRows = [
  ['w-[72px]', 'w-[96px]'],
  ['w-[88px]', 'w-[64px]'],
  ['w-[72px]', 'w-[96px]'],
  ['w-[88px]', 'w-[64px]'],
] as const;

const KeywordSearchPanel = ({
  context = 'search',
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
  const isLoading = state === 'loading';
  const keywordList = keywords ?? defaultKeywords[context];

  return (
    <section
      aria-busy={isLoading}
      className={cn(
        'flex w-full flex-col rounded-xl border border-border-default bg-surface-blue-subtle p-4',
        isLoading ? 'h-[456px] gap-3' : 'gap-12 shadow-card',
        className,
      )}
      {...props}
    >
      {isLoading ? (
        <KeywordSearchSkeleton />
      ) : (
        <>
          <div className="flex w-full flex-col gap-5">
            <div className="flex flex-col">
              <h2 className="text-heading-20 text-text-primary">{title}</h2>
              <p className="text-body-14 text-text-secondary">{description}</p>
            </div>
            <div className="flex w-full flex-col gap-[18px]">
              <KeywordInput
                keyword={keyword}
                onKeywordChange={onKeywordChange}
              />
              <div className="flex flex-wrap gap-2">
                {keywordList.map((item, index) => (
                  <ChipKeyword
                    key={`${item}-${index}`}
                    keyword={item}
                    onRemove={() => onRemove?.(item)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-2">
            <p className="text-center text-caption-12 text-text-secondary">
              키워드 {keywordList.length}개 선택됨
            </p>
            <MyfitSearchButton className="w-full" onClick={onSearch} />
          </div>
        </>
      )}
    </section>
  );
};

// 스켈레톤
const KeywordSearchSkeleton = () => {
  return (
    <>
      <span aria-hidden className="h-4 w-[88px] rounded-md bg-surface-subtle" />
      <span
        aria-hidden
        className="h-2.5 w-[168px] rounded-md bg-surface-subtle"
      />
      <span aria-hidden className="h-10 w-full rounded-lg bg-surface-subtle" />
      {skeletonChipRows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-2">
          {row.map((width, widthIndex) => (
            <span
              key={widthIndex}
              aria-hidden
              className={cn('h-7 rounded-lg bg-surface-subtle', width)}
            />
          ))}
        </div>
      ))}
      <span className="flex-1" />
      <span aria-hidden className="h-11 w-full rounded-lg bg-surface-subtle" />
    </>
  );
};

export default KeywordSearchPanel;
