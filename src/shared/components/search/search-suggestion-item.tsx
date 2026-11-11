import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

import IcClose from '@/shared/assets/icons/ic-close.svg?react';
import IcSearch from '@/shared/assets/icons/ic-search.svg?react';

type SearchSuggestionItemState =
  'default' | 'hover' | 'pressed' | 'focused' | 'disabled';

// 페이지 연결: keyword에 검색어를 넘기고, 줄을 누르면 onSelect, X는 onRemove입니다.
// state는 피그마 확인용이라 페이지에서는 넘기지 않아도 됩니다.
interface SearchSuggestionItemProps extends Omit<
  ComponentProps<'div'>,
  'children' | 'onSelect' // ComponentProps<'div'> 타입에서 children과 onSelect 속성을 제외한 타입
> {
  keyword: string;
  supportingText?: string;
  state?: SearchSuggestionItemState;
  onSelect?: () => void;
  onRemove?: () => void;
}

// state는 피그마 상태 확인용, 실제 화면에서는 기본값 default만 쓰면 hover, pressed, focused가 동작
const stateClassName = {
  default:
    'border-transparent bg-white hover:bg-surface-blue-subtle focus-within:border-action-primary active:bg-surface-blue-subtle active:opacity-88',
  hover: 'border-transparent bg-surface-blue-subtle',
  pressed: 'border-transparent bg-surface-blue-subtle opacity-88',
  focused: 'border-action-primary bg-white',
  disabled: 'border-transparent bg-surface-subtle opacity-48',
} satisfies Record<SearchSuggestionItemState, string>;

const SearchSuggestionItem = ({
  keyword,
  supportingText,
  state = 'default',
  onSelect,
  onRemove,
  className,
  ...props
}: SearchSuggestionItemProps) => {
  const isDisabled = state === 'disabled';

  return (
    <div
      className={cn(
        'flex h-11 w-full items-center gap-3 rounded-md border-2 px-3 py-2',
        stateClassName[state],
        className,
      )}
      {...props}
    >
      <button
        type="button"
        className="flex min-w-0 flex-1 items-center gap-3 text-left"
        disabled={isDisabled}
        onClick={onSelect}
      >
        <IcSearch aria-hidden className="shrink-0 text-text-primary" />
        <span className="flex min-w-0 flex-col px-2">
          <span className="truncate text-label-14 text-text-primary">
            {keyword}
          </span>
          {supportingText && (
            <span className="truncate text-caption-11 text-text-tertiary">
              {supportingText}
            </span>
          )}
        </span>
      </button>
      {onRemove && (
        <button
          type="button"
          aria-label={`${keyword} 삭제`}
          className="shrink-0"
          disabled={isDisabled}
          onClick={onRemove}
        >
          <IcClose aria-hidden />
        </button>
      )}
    </div>
  );
};

export default SearchSuggestionItem;
