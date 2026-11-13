import type { ComponentProps } from 'react';

import TagEssential from '@/shared/components/badge/tag-essential';
import ChipStickyDocumentCount from '@/shared/components/chip/chip-sticky-document-count';
import { cn } from '@/shared/utils/cn';

import IcDocumentCheck from '@/shared/assets/icons/ic-document-check.svg?react';
import IcDocumentStatus from '@/shared/assets/icons/ic-document-status.svg?react';

type StickyDocumentState = 'ready' | 'required';

// 페이지 연결: 서류 이름은 label, 준비됨·필수는 state, 준비된 개수는 count입니다.
// label 기본값은 피그마 예시 문구입니다.
interface RowStickyDocumentProps extends ComponentProps<'div'> {
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
  const isReady = state === 'ready';

  return (
    <div
      className={cn('flex h-8 w-full items-center justify-between', className)}
      {...props}
    >
      <div className="flex items-center gap-2">
        {isReady ? (
          <IcDocumentCheck aria-hidden className="shrink-0" />
        ) : (
          <IcDocumentStatus aria-hidden className="shrink-0" />
        )}
        <p className="text-body-14 whitespace-nowrap text-text-primary">
          {label}
        </p>
      </div>
      {isReady ? (
        <ChipStickyDocumentCount>{count}</ChipStickyDocumentCount>
      ) : (
        <TagEssential />
      )}
    </div>
  );
};

export default RowStickyDocument;
