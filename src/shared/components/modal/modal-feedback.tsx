import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

import IcModalError from '@/shared/assets/icons/ic-modal-error.svg?react';
import IcModalInfo from '@/shared/assets/icons/ic-modal-info.svg?react';
import IcModalSuccess from '@/shared/assets/icons/ic-modal-success.svg?react';
import IcModalUnknown from '@/shared/assets/icons/ic-modal-unknown.svg?react';

// 색만으로 상태를 구분하지 않도록 아이콘 · 제목 · 설명을 함께 보여줘요.
const STATUS_ICONS = {
  empty: IcModalInfo,
  success: IcModalSuccess,
  error: IcModalError,
  unknown: IcModalUnknown,
};

interface ModalFeedbackProps extends ComponentProps<'div'> {
  status?: keyof typeof STATUS_ICONS;
  title: string;
  description?: string;
}

const ModalFeedback = ({
  status = 'empty',
  title,
  description,
  className,
  ...props
}: ModalFeedbackProps) => {
  const StatusIcon = STATUS_ICONS[status];

  return (
    <div
      role={status === 'error' ? 'alert' : 'status'}
      className={cn(
        'flex min-h-40 w-full flex-col items-center justify-center gap-3 bg-surface-default text-center',
        className,
      )}
      {...props}
    >
      <StatusIcon aria-hidden className="shrink-0" />
      <div className="flex flex-col gap-1">
        <p className="text-title-16 text-text-primary">{title}</p>
        {description && (
          <p className="text-body-14 text-text-secondary">{description}</p>
        )}
      </div>
    </div>
  );
};

export default ModalFeedback;
