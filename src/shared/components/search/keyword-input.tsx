import { type ComponentProps, type KeyboardEvent, useState } from 'react';

import ChipKeyword from '@/shared/components/chip/chip-keyword';
import { cn } from '@/shared/utils/cn';

import IcSearch from '@/shared/assets/icons/ic-search.svg?react';

type KeywordInputState = 'default' | 'focused' | 'error' | 'chip';

// 페이지 연결: 입력값은 keyword와 onKeywordChange, 입력창 안 칩은 keywords와 onRemove입니다.
// Enter로 입력을 확정하면 onKeywordSubmit이 불립니다. (칩으로 추가하는 처리는 페이지에서)
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
  onKeywordSubmit?: (keyword: string) => void;
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
  message = '일치하는 키워드가 없어요. 다른 키워드로 검색해 주세요.',
  keywords = [],
  onKeywordChange,
  onKeywordSubmit,
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

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // 한글 조합 중의 Enter는 글자 확정이라 넘겨요. (마지막 글자가 두 번 들어가지 않게)
    if (e.key !== 'Enter' || e.nativeEvent.isComposing) return;
    e.preventDefault();
    onKeywordSubmit?.(inputValue);
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
          onKeyDown={handleKeyDown}
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
