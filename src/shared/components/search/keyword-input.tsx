import { type ComponentProps, useState } from 'react';

import ChipKeyword from '@/shared/components/chip/chip-keyword';
import { cn } from '@/shared/utils/cn';

import IcSearch from '@/shared/assets/icons/ic-search.svg?react';

type KeywordInputState = 'default' | 'focused' | 'error' | 'chip';

// 페이지 연결: 입력값은 keyword와 onKeywordChange, 입력창 안 칩은 keywords와 onRemove입니다.
// 에러 문구는 message입니다. 피그마의 추천 목록은 기본으로 숨겨져 있어서 입력창만 구현했습니다.
interface KeywordInputProps extends Omit<
  ComponentProps<'div'>,
  'children' | 'onChange'
> {
  state?: KeywordInputState;
  keyword?: string;
  placeholder?: string;
  message?: string;
  keywords?: string[];
  onKeywordChange?: (keyword: string) => void;
  onRemove?: (keyword: string) => void;
}

const BORDER_CLASS_NAMES = {
  default:
    'border border-border-default focus-within:border-2 focus-within:border-blue-90',
  focused: 'border-2 border-blue-90',
  error: 'border border-coral-80',
  chip: 'border-2 border-blue-90',
} satisfies Record<KeywordInputState, string>;

const KeywordInput = ({
  state = 'default',
  keyword = '',
  placeholder = '키워드 입력',
  message = '해당 검색 결과가 없습니다.',
  keywords = [],
  onKeywordChange,
  onRemove,
  className,
  ...props
}: KeywordInputProps) => {
  const hasChips = keywords.length > 0 || state === 'chip';
  const borderState = state === 'error' ? 'error' : hasChips ? 'chip' : state;
  const [draftKeyword, setDraftKeyword] = useState(keyword);
  const inputValue = onKeywordChange ? keyword : draftKeyword;

  const handleKeywordChange = (nextKeyword: string) => {
    if (onKeywordChange) {
      onKeywordChange(nextKeyword);
      return;
    }
    setDraftKeyword(nextKeyword);
  };

  return (
    <div className={cn('flex w-full flex-col gap-1', className)} {...props}>
      <label
        className={cn(
          'flex w-full items-center gap-2 overflow-hidden rounded-lg bg-white',
          hasChips ? 'min-h-12.5 px-2 py-1' : 'h-12.5 p-2',
          BORDER_CLASS_NAMES[borderState],
        )}
      >
        <IcSearch aria-hidden className="shrink-0 text-text-tertiary" />
        {keywords.length > 0 && (
          <div className="flex shrink-0 gap-1">
            {keywords.map((item) => (
              <ChipKeyword
                key={item}
                keyword={item}
                className="shrink-0"
                onRemove={() => onRemove?.(item)}
              />
            ))}
          </div>
        )}
        <input
          value={inputValue}
          placeholder={keywords.length > 0 ? '' : placeholder}
          aria-invalid={state === 'error'}
          onChange={(event) => handleKeywordChange(event.target.value)}
          className={cn(
            'h-6 min-w-0 flex-1 bg-transparent text-body-16 text-text-primary outline-none',
            state === 'focused'
              ? 'placeholder:text-text-primary'
              : 'placeholder:text-text-tertiary',
          )}
        />
      </label>
      {state === 'error' && (
        <p className="text-body-12 text-status-danger">{message}</p>
      )}
    </div>
  );
};

export default KeywordInput;
