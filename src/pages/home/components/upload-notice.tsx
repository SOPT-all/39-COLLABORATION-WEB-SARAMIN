// [스펙] UploadNotice
// 역할   : 서류 업로드 모달 아래쪽 안내 상자 (피그마 notice, 672×72)
// props  : tone - info(파랑 i) · error(빨강 !, 설명도 빨강)
//          title · description - 안내 문구

import { cn } from '@/shared/utils/cn';

interface UploadNoticeProps {
  tone?: 'info' | 'error';
  title: string;
  description: string;
}

const UploadNotice = ({
  tone = 'info',
  title,
  description,
}: UploadNoticeProps) => {
  const isError = tone === 'error';

  return (
    <div
      role={isError ? 'alert' : 'note'}
      className={cn(
        'flex h-18 w-full items-center gap-3 rounded-xl p-4',
        isError ? 'bg-surface-subtle' : 'bg-surface-blue-subtle',
      )}
    >
      <span
        aria-hidden
        className={cn(
          'flex size-10 shrink-0 items-center justify-center rounded-full text-title-16',
          isError ? 'bg-status-danger text-white' : 'text-blue-90',
        )}
      >
        {isError ? '!' : 'i'}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="text-label-14 text-text-primary">{title}</p>
        <p
          className={cn(
            'text-caption-12',
            isError ? 'text-status-danger' : 'text-text-secondary',
          )}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default UploadNotice;
