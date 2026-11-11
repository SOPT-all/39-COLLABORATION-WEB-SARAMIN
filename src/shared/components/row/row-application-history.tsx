import type { ComponentProps } from 'react';

import ChipTool from '@/shared/components/chip/chip-tool';
import { cn } from '@/shared/utils/cn';

type ApplicationHistoryStatus =
  'submitted' | 'viewed' | 'under_review' | 'interview' | 'rejected';

const STATUS_VARIANTS = {
  submitted: 'green',
  viewed: 'green',
  interview: 'green',
  under_review: 'blue',
  rejected: 'red',
} as const;

// 페이지 연결: 회사·직무는 title, 지원 정보는 meta, 상태는 status, 상태 문구는 statusLabel, 로고 글자는 logoText입니다.
// 기본값은 피그마 예시 문구입니다.
interface RowApplicationHistoryProps extends ComponentProps<'div'> {
  title?: string;
  meta?: string;
  status?: ApplicationHistoryStatus;
  statusLabel?: string;
  logoText?: string;
}

const RowApplicationHistory = ({
  title = '서연이화 · 프로덕트 디자이너',
  meta = '지원 패키지 · 2026.11.03 14:32',
  status = 'submitted',
  statusLabel = '지원 완료',
  logoText = 'S',
  className,
  ...props
}: RowApplicationHistoryProps) => {
  return (
    <div
      className={cn(
        'flex h-[88px] w-full items-center gap-4 rounded-lg border border-border-default bg-surface-default p-4',
        className,
      )}
      {...props}
    >
      <div className="flex size-[52px] shrink-0 items-center justify-center rounded-lg bg-surface-subtle">
        <p className="text-caption-12 text-text-secondary">{logoText}</p>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1 overflow-hidden">
        <p className="truncate text-label-14 text-text-primary">{title}</p>
        <p className="truncate text-caption-12 text-text-secondary">{meta}</p>
      </div>
      <ChipTool
        variant={STATUS_VARIANTS[status]}
        className="h-auto w-auto shrink-0 px-2 py-1"
      >
        {statusLabel}
      </ChipTool>
    </div>
  );
};

export default RowApplicationHistory;
