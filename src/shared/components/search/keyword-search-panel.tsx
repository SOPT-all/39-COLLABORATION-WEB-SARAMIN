import { type ComponentProps, type FocusEvent, useState } from 'react';

import MyfitSearchButton from '@/shared/components/button/myfit-search-button';
import ChipKeyword from '@/shared/components/chip/chip-keyword';
import ListSearch, {
  type SearchKeywordGroup,
} from '@/shared/components/list/list-search';
import KeywordInput from '@/shared/components/search/keyword-input';
import SkeletonFilterPanel from '@/shared/components/skeleton/skeleton-filter-panel';
import { cn } from '@/shared/utils/cn';

type KeywordSearchPanelState = 'loaded' | 'loading';

// 페이지 연결: keywords에 선택된 키워드를 넘기고, 칩의 X는 onRemove로 목록에서 빼야 사라집니다.
// 입력 중인 글자는 keyword와 onKeywordChange, 검색하기 클릭은 onSearch입니다.
// 입력창에서 Enter를 누르면 onKeywordSubmit이 불립니다. 칩으로 추가하는 처리는 페이지에서 keywords에 넣으면 됩니다.
// 후보 목록은 candidateGroups로 넘깁니다. 입력 중이고 입력창에 포커스가 있을 때 입력창 아래에 띄우고,
// 후보를 누르면 onCandidateSelect가 불립니다. 후보가 0개면 입력창이 오류 상태로 바뀌어 안내 문구가 보입니다. (FR-09 · FN-10)
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
  onKeywordSubmit?: (keyword: string) => void;
  candidateGroups?: SearchKeywordGroup[];
  onCandidateSelect?: (keyword: string) => void;
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
  onKeywordSubmit,
  candidateGroups,
  onCandidateSelect,
  onRemove,
  onSearch,
  className,
  ...props
}: KeywordSearchPanelProps) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const isTyping = keyword.trim().length > 0;
  const isCandidateOpen =
    Boolean(candidateGroups) && isTyping && isInputFocused;
  const hasNoCandidates = isCandidateOpen && candidateGroups?.length === 0;

  // 후보 버튼으로 포커스가 옮겨 가도 목록을 닫지 않아요.
  const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    setIsInputFocused(false);
  };

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
          <div
            className="relative"
            onFocus={() => setIsInputFocused(true)}
            onBlur={handleBlur}
          >
            <KeywordInput
              state={hasNoCandidates ? 'error' : 'default'}
              keyword={keyword}
              onKeywordChange={onKeywordChange}
              onKeywordSubmit={onKeywordSubmit}
            />
            {isCandidateOpen && !hasNoCandidates && candidateGroups && (
              <ListSearch
                groups={candidateGroups}
                aria-label="키워드 후보"
                className="absolute top-full left-0 z-10 mt-1 max-h-80 overflow-y-auto shadow-card"
                // 사파리는 버튼을 눌러도 포커스가 가지 않아, 누르는 순간 입력창 포커스가 빠지지 않게 막아요.
                onMouseDown={(e) => e.preventDefault()}
                onSelect={(selectedKeyword) =>
                  onCandidateSelect?.(selectedKeyword)
                }
              />
            )}
          </div>
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
        <MyfitSearchButton className="w-full" onClick={onSearch}>
          검색하기
        </MyfitSearchButton>
      </div>
    </section>
  );
};

export default KeywordSearchPanel;
