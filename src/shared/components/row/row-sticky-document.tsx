import type { ComponentProps } from 'react';

import TagEssential from '@/shared/components/badge/tag-essential';
import ChipStickyDocumentCount from '@/shared/components/chip/chip-sticky-document-count';
import { cn } from '@/shared/utils/cn';

import IcDocumentCheck from '@/shared/assets/icons/ic-document-check.svg?react';
import IcDocumentStatus from '@/shared/assets/icons/ic-document-status.svg?react';
import IcDocumentWaiting from '@/shared/assets/icons/ic-document-waiting.svg?react';
import IcTooltipDocumentCheck from '@/shared/assets/icons/ic-tooltip-document-check.svg?react';

type StickyDocumentState = 'ready' | 'required' | 'waiting';

const STATE_ICONS = {
  ready: IcDocumentCheck,
  required: IcDocumentStatus,
  waiting: IcDocumentWaiting,
};

// 페이지 연결 : label - 서류 이름, state - 준비됨 · 필수 · 확인 전, count - 준비된 개수
// waiting : 아직 체크하지 않은 서류. 물음표와 파란 글자로 표시, hover · 키보드 포커스 시 안내 말풍선 표시
// label 기본값 : 피그마 예시 문구
interface RowStickyDocumentProps extends ComponentProps<'button'> {
  label?: string;
  state?: StickyDocumentState;
  count?: number;
}

const RowStickyDocument = ({
  label = '이력서',
  state = 'ready',
  count = 1,
  className,
  ...props
}: RowStickyDocumentProps) => {
  const Icon = STATE_ICONS[state];
  const isWaiting = state === 'waiting';

  return (
    <button
      type="button"
      className={cn(
        'group relative flex h-8 w-full cursor-pointer items-center justify-between',
        isWaiting &&
          'bg-linear-to-r from-surface-default via-blue-30 via-[20.192%] to-surface-default',
        className,
      )}
      {...props}
    >
      <span className="flex items-center gap-2">
        <Icon aria-hidden className="shrink-0" />
        <span
          className={cn(
            'text-body-14 whitespace-nowrap text-text-primary',
            isWaiting && 'text-blue-90',
          )}
        >
          {label}
        </span>
      </span>
      {state === 'required' ? (
        <TagEssential />
      ) : (
        <ChipStickyDocumentCount
          className={cn(isWaiting && 'text-text-tertiary')}
        >
          {count}
        </ChipStickyDocumentCount>
      )}
      {isWaiting && (
        <span className="pointer-events-none absolute -top-4.5 left-27.5 z-10 hidden h-6 w-23.5 group-hover:block group-focus-visible:block">
          <IcTooltipDocumentCheck aria-hidden className="absolute inset-0" />
          <span className="absolute top-0 left-1.25 text-body-12 whitespace-nowrap text-white">
            눌러서 서류 검사
          </span>
        </span>
      )}
    </button>
  );
};

export default RowStickyDocument;
