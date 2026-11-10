import type { ComponentProps } from 'react';

import AiButton from '@/shared/components/button/ai-button';
import { cn } from '@/shared/utils/cn';

import IcLoadingSpinner from '@/shared/assets/icons/ic-loading-spinner.svg?react';
import IcSearch from '@/shared/assets/icons/ic-search.svg?react';

type SearchGlobalState = 'default' | 'focused' | 'typing' | 'loading' | 'error';

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
          'flex min-h-[46px] w-full items-center justify-between rounded-full bg-white px-4 py-1.5',
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
        <AiButton className="shrink-0" onClick={onAiSearch} />
      </div>
      {state === 'error' && (
        <div className="flex h-12 w-full items-center gap-2 rounded-lg bg-coral-30 px-3 py-2">
          <span aria-hidden className="size-2 shrink-0 rounded-full bg-status-danger" />
          <p className="min-w-0 flex-1 text-body-12 text-text-primary">
            {errorMessage}
          </p>
          <button
            type="button"
            className="flex h-8 w-24 shrink-0 items-center justify-center rounded-md border border-border-default bg-white px-3 text-label-12 text-text-secondary"
            onClick={onRetry}
          >
            다시 시도
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchGlobal;
