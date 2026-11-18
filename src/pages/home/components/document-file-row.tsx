// [스펙] DocumentFileRow
// 역할   : 지원 서류 관리 모달의 서류 파일 한 행 (피그마 row_document, 672×88)
// props  : document - 파일 이름 · 형식 · 크기 · 업데이트 시각 · 상태
// 구조   : [문서 아이콘 44px] [파일 이름 / 형식 · 크기 · n분 전 업데이트] [상태 배지] [→]
// 상태   : ready → 사용 가능(초록) · needsReview → 검토 필요(파랑)

import type { DocumentFile } from '@/pages/home/types/document-file';
import { convertUpdatedAtToLabel } from '@/pages/home/utils/convert-updated-at-to-label';
import { cn } from '@/shared/utils/cn';

import IcChevronRight from '@/shared/assets/icons/ic-chevron-right.svg?react';

const STATUS_BADGES = {
  ready: { label: '사용 가능', className: 'bg-green-20 text-status-success' },
  needsReview: {
    label: '검토 필요',
    className: 'bg-surface-blue-subtle text-blue-90',
  },
};

interface DocumentFileRowProps {
  document: DocumentFile;
}

const DocumentFileRow = ({ document }: DocumentFileRowProps) => {
  const { fileName, format, sizeLabel, updatedAt, status } = document;
  const badge = STATUS_BADGES[status];

  return (
    <div className="flex h-22 w-full items-center gap-4 rounded-lg border border-border-default bg-surface-default p-4">
      <span
        aria-hidden
        className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-surface-blue-subtle text-caption-12 text-text-secondary"
      >
        문서
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="truncate text-label-14 text-text-primary">{fileName}</p>
        <p className="truncate text-caption-12 text-text-secondary">
          {format} · {sizeLabel} · {convertUpdatedAtToLabel(updatedAt)} 업데이트
        </p>
      </div>
      <span
        className={cn(
          'shrink-0 rounded-full px-2 py-1 text-caption-12 whitespace-nowrap',
          badge.className,
        )}
      >
        {badge.label}
      </span>
      <IcChevronRight
        aria-hidden
        className="size-3.5 shrink-0 text-text-secondary"
      />
    </div>
  );
};

export default DocumentFileRow;
