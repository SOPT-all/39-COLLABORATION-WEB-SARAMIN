// [스펙] UploadFileRow
// 역할   : 서류 업로드 모달의 올린 파일 한 행 (피그마 row_upload_file, 672×72)
// props  : fileName · meta - 파일 이름과 진행 · 크기 문구
//          status - uploading(스피너) · success(완료) · error(빨간 테두리 · 재시도)
//          onRetry - error에서 "재시도"를 누르면
// 구조   : [확장자 아이콘 36px] [파일 이름 / meta] [상태]

import LoadingSpinner from '@/shared/components/loading-spinner/loading-spinner';
import { cn } from '@/shared/utils/cn';

type UploadFileStatus = 'uploading' | 'success' | 'error';

interface UploadFileRowProps {
  fileName: string;
  extension: string;
  meta: string;
  status: UploadFileStatus;
  onRetry?: () => void;
}

const UploadFileRow = ({
  fileName,
  extension,
  meta,
  status,
  onRetry,
}: UploadFileRowProps) => {
  return (
    <div
      className={cn(
        'flex h-18 w-full items-center gap-3 rounded-lg border bg-surface-default p-4',
        status === 'error' ? 'border-status-danger' : 'border-border-default',
      )}
    >
      <span
        aria-hidden
        className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface-blue-subtle text-caption-12 text-text-secondary"
      >
        {extension}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="truncate text-label-14 text-text-primary">{fileName}</p>
        <p className="truncate text-caption-12 text-text-secondary">{meta}</p>
      </div>
      {status === 'uploading' && <LoadingSpinner />}
      {status === 'success' && (
        <p className="shrink-0 text-caption-12 text-status-success">완료</p>
      )}
      {status === 'error' && onRetry && (
        <button
          type="button"
          className="shrink-0 text-caption-12 text-status-danger"
          onClick={onRetry}
        >
          재시도
        </button>
      )}
    </div>
  );
};

export default UploadFileRow;
