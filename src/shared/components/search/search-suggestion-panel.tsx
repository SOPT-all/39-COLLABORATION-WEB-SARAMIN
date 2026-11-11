import type { ComponentProps, ReactNode } from 'react';

import ActionButton from '@/shared/components/button/action-button';
import SearchSuggestionItem from '@/shared/components/search/search-suggestion-item';
import { cn } from '@/shared/utils/cn';

import IcKindEmpty from '@/shared/assets/icons/ic-kind-empty.svg?react';
import IcKindError from '@/shared/assets/icons/ic-kind-error.svg?react';

type SearchSuggestionPanelContentState =
  'recent' | 'predictive' | 'related' | 'loading' | 'empty' | 'error';

interface SearchSuggestion {
  keyword: string;
  supportingText?: string;
}

// 페이지 연결: suggestions에 목록을 넘기고, 줄을 누르면 onSelect, 최근 검색의 X는 onRemove입니다.
// 필터 초기화는 onResetFilter, 다시 시도는 onRetry입니다. 불러오는 중에는 contentState="loading"입니다.
interface SearchSuggestionPanelProps extends Omit<
  ComponentProps<'section'>,
  'children' | 'onSelect'
> {
  contentState?: SearchSuggestionPanelContentState;
  suggestions?: SearchSuggestion[];
  onSelect?: (keyword: string) => void;
  onRemove?: (keyword: string) => void;
  onResetFilter?: () => void;
  onRetry?: () => void;
}

const panelTitle = {
  recent: '최근 검색어',
  predictive: '검색어 자동완성',
  related: '연관 검색어',
  loading: '검색어를 불러오는 중',
  empty: '추천 검색어 없음',
  error: '추천 검색어 오류',
} satisfies Record<SearchSuggestionPanelContentState, string>;

// 피그마 예시 검색어 (suggestions를 넘기면 이 값은 쓰이지 않음)
const defaultSuggestions = {
  recent: [
    { keyword: '프로덕트 디자이너', supportingText: '최근 검색' },
    { keyword: 'ui 디자이너', supportingText: '최근 검색' },
    { keyword: '서비스 기획', supportingText: '최근 검색' },
    { keyword: 'figma', supportingText: '최근 검색' },
  ],
  predictive: [
    { keyword: '프로덕트 디자이너', supportingText: '최근 검색' },
    { keyword: '프로덕트 디자인 인턴', supportingText: '자동완성' },
    { keyword: 'product designer', supportingText: '자동완성' },
    { keyword: '프로덕트 오너', supportingText: '최근 검색' },
  ],
  related: [
    { keyword: 'ux 디자이너', supportingText: '최근 검색' },
    { keyword: '서비스 디자이너', supportingText: '연관 검색' },
    { keyword: 'ui ux 포트폴리오', supportingText: '연관 검색' },
    { keyword: '디자인 시스템', supportingText: '최근 검색' },
  ],
} satisfies Record<'recent' | 'predictive' | 'related', SearchSuggestion[]>;

// 스켈레톤 라인 너비 (피그마 선 너비 440, 376, 416, 336px을 패널 너비에 맞춘 비율)
const skeletonLineWidth = ['w-[85%]', 'w-[72%]', 'w-[80%]', 'w-[64%]'];

const SearchSuggestionPanel = ({
  contentState = 'recent',
  suggestions,
  onSelect,
  onRemove,
  onResetFilter,
  onRetry,
  className,
  ...props
}: SearchSuggestionPanelProps) => {
  const isLoading = contentState === 'loading';
  const suggestionList =
    suggestions ??
    (contentState === 'recent' ||
    contentState === 'predictive' ||
    contentState === 'related'
      ? defaultSuggestions[contentState]
      : []);

  return (
    <section
      aria-busy={isLoading}
      className={cn(
        'flex h-[280px] w-full flex-col gap-2 rounded-xl border border-border-default bg-white p-3',
        className,
      )}
      {...props}
    >
      <h2 className="text-title-14 text-text-primary">
        {panelTitle[contentState]}
      </h2>
      <div className="flex min-h-0 flex-1 flex-col gap-1">
        {suggestionList.map((suggestion) => (
          <SearchSuggestionItem
            key={suggestion.keyword}
            keyword={suggestion.keyword}
            supportingText={suggestion.supportingText}
            onSelect={() => onSelect?.(suggestion.keyword)}
            onRemove={
              contentState === 'recent'
                ? () => onRemove?.(suggestion.keyword)
                : undefined
            }
          />
        ))}
        {isLoading &&
          skeletonLineWidth.map((lineWidth) => (
            <div
              key={lineWidth}
              className="flex items-center gap-3 py-2"
              aria-hidden
            >
              <span className="size-6 shrink-0 rounded-full bg-surface-subtle" />
              <span
                className={cn('h-3 rounded-md bg-surface-subtle', lineWidth)}
              />
            </div>
          ))}
        {contentState === 'empty' && (
          <SearchSuggestionMessage
            title="검색 결과가 없습니다"
            description="검색어나 필터 조건을 조정해 주세요"
            actionLabel="필터 초기화"
            icon={<IcKindEmpty aria-hidden />}
            onAction={onResetFilter}
          />
        )}
        {contentState === 'error' && (
          <SearchSuggestionMessage
            title="정보를 불러오지 못했습니다"
            description="입력값은 유지됩니다. 잠시 후 다시 시도해 주세요"
            actionLabel="다시 시도"
            icon={<IcKindError aria-hidden />}
            onAction={onRetry}
          />
        )}
      </div>
    </section>
  );
};

interface SearchSuggestionMessageProps {
  title: string;
  description: string;
  actionLabel: string;
  icon: ReactNode;
  onAction?: () => void;
}

// TODO: state_message가 공통 컴포넌트로 생기면 이 부분을 그걸로 교체해야 함
const SearchSuggestionMessage = ({
  title,
  description,
  actionLabel,
  icon,
  onAction,
}: SearchSuggestionMessageProps) => {
  return (
    <div className="flex h-[72px] w-full items-center gap-3 rounded-lg border border-border-default p-3">
      {icon}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="truncate text-title-14 text-text-primary">{title}</p>
        <p className="truncate text-body-12 text-text-secondary">
          {description}
        </p>
      </div>
      <ActionButton onClick={onAction}>{actionLabel}</ActionButton>
    </div>
  );
};

export default SearchSuggestionPanel;
