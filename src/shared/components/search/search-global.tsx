import type { ComponentProps } from 'react';

import ActionButton from '@/shared/components/button/action-button';
import { cn } from '@/shared/utils/cn';

import IcFilters from '@/shared/assets/icons/ic-filters.svg?react';
import IcLoadingSpinner from '@/shared/assets/icons/ic-loading-spinner.svg?react';
import IcSearch from '@/shared/assets/icons/ic-search.svg?react';

type SearchGlobalState = 'default' | 'focused' | 'typing' | 'loading' | 'error';

// 페이지 연결: 입력값은 query와 onQueryChange, AI 검색은 onAiSearch, 다시 시도는 onRetry입니다.
// 포커스·입력·로딩·에러 모양은 state로 바꿉니다.
interface SearchGlobalProps extends Omit<
  ComponentProps<'div'>,
  'children' | 'onChange'
> {
  query?: string;
  placeholder?: string;
  state?: SearchGlobalState;
  errorMessage?: string;
  onQueryChange?: (query: string) => void;
  onAiSearch?: () => void;
  onRetry?: () => void;
}

const borderClassName = {
  default: 'border-2 border-blue-90',
  focused: 'border-[1.5px] border-blue-90',
  typing: 'border-[1.5px] border-blue-90',
  loading: 'border-2 border-blue-90',
  error: 'border-[1.5px] border-status-danger',
} satisfies Record<SearchGlobalState, string>;

// placeholder, errorMessage 기본값은 피그마 예시 문구
const SearchGlobal = ({
  query = '',
  placeholder = '프로덕트 디자이너',
  state = 'default',
  errorMessage = '일부 정보를 불러오지 못했습니다',
  onQueryChange,
  onAiSearch,
  onRetry,
  className,
  ...props
}: SearchGlobalProps) => {
  const isLoading = state === 'loading';

  return (
    <div className={cn('flex w-full flex-col gap-2', className)} {...props}>
      <div
        className={cn(
          'flex h-[46px] w-full items-center justify-between rounded-full bg-white px-4 py-1.5',
          borderClassName[state],
        )}
      >
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          {isLoading ? (
            <IcLoadingSpinner aria-hidden className="shrink-0" />
          ) : (
            <IcSearch aria-hidden className="shrink-0 text-text-secondary" />
          )}
          <input
            value={query}
            placeholder={placeholder}
            readOnly={isLoading}
            aria-busy={isLoading}
            onChange={(event) => onQueryChange?.(event.target.value)}
            className="h-5 min-w-0 flex-1 bg-transparent text-body-14 text-text-secondary outline-none placeholder:text-text-secondary"
          />
        </div>
        <button
          type="button"
          className="flex h-[30px] w-[92px] shrink-0 items-center gap-1.5 rounded-full bg-surface-blue-subtle p-1.5 text-label-14 whitespace-nowrap text-blue-90"
          onClick={onAiSearch}
        >
          <IcFilters aria-hidden className="shrink-0" />
          AI 검색
        </button>
      </div>
      {state === 'error' && (
        <div className="flex h-12 w-full items-center gap-2 rounded-lg bg-coral-30 px-3 py-2">
          <span
            aria-hidden
            className="size-2 shrink-0 rounded-full bg-status-danger"
          />
          <p className="min-w-0 flex-1 text-body-12 text-text-primary">
            {errorMessage}
          </p>
          <ActionButton onClick={onRetry}>다시 시도</ActionButton>
        </div>
      )}
    </div>
  );
};

export default SearchGlobal;
