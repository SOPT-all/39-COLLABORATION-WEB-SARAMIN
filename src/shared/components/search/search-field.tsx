import { type ComponentProps, useState } from 'react';

import { cn } from '@/shared/utils/cn';

import IcClose from '@/shared/assets/icons/ic-close.svg?react';
import IcLoadingSpinner from '@/shared/assets/icons/ic-loading-spinner.svg?react';
import IcSearch from '@/shared/assets/icons/ic-search.svg?react';

type SearchFieldState =
  'default' | 'focused' | 'typing' | 'loading' | 'error' | 'disabled';

// 페이지 연결: 입력값은 query와 onQueryChange, 지우기는 onClear, 검증 문구는 message입니다.
// 포커스·입력·로딩·에러·비활성 모양은 state로 바꿉니다. 실제 입력은 state를 넘기지 않아도 됩니다.
interface SearchFieldProps extends Omit<
  ComponentProps<'div'>,
  'children' | 'onChange'
> {
  state?: SearchFieldState;
  query?: string;
  placeholder?: string;
  message?: string;
  onQueryChange?: (query: string) => void;
  onClear?: () => void;
}

const borderClassName = {
  default:
    'border border-border-default focus-within:border-2 focus-within:border-blue-90',
  focused: 'border-2 border-blue-90',
  typing: 'border-2 border-blue-90',
  loading: 'border-2 border-blue-90',
  error: 'border border-status-danger',
  disabled: 'border border-border-default bg-surface-subtle',
} satisfies Record<SearchFieldState, string>;

const SearchField = ({
  state = 'default',
  query = '',
  placeholder = '검색어를 입력해 주세요',
  message = '검색어는 100자 이내로 입력해 주세요',
  onQueryChange,
  onClear,
  className,
  ...props
}: SearchFieldProps) => {
  const isLoading = state === 'loading';
  const isDisabled = state === 'disabled';
  const [draftQuery, setDraftQuery] = useState(query);
  const inputValue = onQueryChange ? query : draftQuery;
  const showsClearButton = inputValue.length > 0 && !isLoading && !isDisabled;

  const handleQueryChange = (nextQuery: string) => {
    if (onQueryChange) {
      onQueryChange(nextQuery);
      return;
    }
    setDraftQuery(nextQuery);
  };

  const handleClear = () => {
    handleQueryChange('');
    onClear?.();
  };

  return (
    <div
      className={cn(
        'flex w-full flex-col gap-1',
        isDisabled && 'opacity-64',
        className,
      )}
      {...props}
    >
      <label
        className={cn(
          'flex h-12 w-full items-center gap-3 rounded-lg bg-white px-4',
          borderClassName[state],
        )}
      >
        <IcSearch aria-hidden className="shrink-0 text-text-tertiary" />
        <input
          value={inputValue}
          placeholder={placeholder}
          disabled={isDisabled}
          readOnly={isLoading}
          aria-busy={isLoading}
          aria-invalid={state === 'error'}
          onChange={(event) => handleQueryChange(event.target.value)}
          className="h-5 min-w-0 flex-1 bg-transparent text-body-14 text-text-primary outline-none placeholder:text-text-tertiary"
        />
        {showsClearButton && (
          <button
            type="button"
            aria-label="검색어 삭제"
            className="shrink-0"
            onClick={handleClear}
          >
            <IcClose aria-hidden />
          </button>
        )}
        {isLoading && <IcLoadingSpinner aria-hidden className="shrink-0" />}
      </label>
      {state === 'error' && (
        <p className="text-body-12 text-status-danger">{message}</p>
      )}
    </div>
  );
};

export default SearchField;
