// [스펙] UploadDropZone
// 역할   : 서류 업로드 모달 위쪽의 파일 놓는 영역 (피그마 drop_zone_upload, 672×180)
// props  : status - idle · uploading · error. dragOver는 안에서 관리
//          title · description - 상태별 안내 문구
//          onFileDrop - 파일을 끌어다 놓았을 때 (idle · error에서만 받음)
// 구조   : [원 아이콘 ↑ · !] [제목] [설명], 점선 테두리

import { type DragEvent, useState } from 'react';

import { cn } from '@/shared/utils/cn';

type UploadDropZoneStatus = 'idle' | 'uploading' | 'error';

interface UploadDropZoneProps {
  status: UploadDropZoneStatus;
  title: string;
  description: string;
  onFileDrop: (file: File) => void;
}

const UploadDropZone = ({
  status,
  title,
  description,
  onFileDrop,
}: UploadDropZoneProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const canDrop = status !== 'uploading';
  const isError = status === 'error';

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    if (!canDrop || !e.dataTransfer.types.includes('Files')) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setIsDragOver(true);
  };

  // 영역 안의 글자 · 아이콘으로 옮겨 갈 때는 나간 것으로 보지 않아요.
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    if (e.currentTarget.contains(e.relatedTarget as Node | null)) return;
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (canDrop && droppedFile) onFileDrop(droppedFile);
  };

  return (
    <div
      className={cn(
        'flex h-45 w-full shrink-0 flex-col items-center justify-center gap-3 rounded-xl border border-dashed bg-surface-default p-6 text-center',
        isError ? 'border-status-danger' : 'border-border-default',
        isDragOver && 'border-blue-90 bg-surface-blue-subtle',
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <span
        aria-hidden
        className={cn(
          'flex size-12 items-center justify-center rounded-full text-caption-12 text-text-secondary',
          isError ? 'bg-coral-20' : 'bg-surface-blue-subtle',
        )}
      >
        {isError ? '!' : '↑'}
      </span>
      <p className="text-label-14 text-text-primary">{title}</p>
      <p className="text-caption-12 text-text-secondary">{description}</p>
    </div>
  );
};

export default UploadDropZone;
