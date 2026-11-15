import { useId, useState } from 'react';

import ModalDialog, {
  type ModalDialogProps,
} from '@/shared/components/modal/modal-dialog';
import { cn } from '@/shared/utils/cn';

import IcModalSuccess from '@/shared/assets/icons/ic-modal-success.svg?react';

interface ModalApplyReviewProps extends Omit<ModalDialogProps, 'children'> {
  companyName: string;
  positionName: string;
  documentSummary: string;
  isSubmitting?: boolean;
  onSubmit: () => void;
}

// 최종 지원 전 제출 서류를 확인하는 모달이에요. 동의 체크 후에만 지원할 수 있어요.
const ModalApplyReview = ({
  companyName,
  positionName,
  documentSummary,
  isSubmitting = false,
  onSubmit,
  isOpen,
  onClose,
  className,
  ...props
}: ModalApplyReviewProps) => {
  const titleId = useId();
  const [hasAgreed, setHasAgreed] = useState(false);
  const [wasOpen, setWasOpen] = useState(isOpen);

  // 모달이 새로 열릴 때마다 동의 체크를 초기화해요. (지원 완료 후 다시 열어도 체크가 남지 않게)
  if (isOpen !== wasOpen) {
    setWasOpen(isOpen);
    if (isOpen) setHasAgreed(false);
  }

  return (
    <ModalDialog
      aria-labelledby={titleId}
      className={cn(
        'h-82.5 w-140 flex-col gap-4 rounded-[20px] border border-border-default bg-surface-default p-6 shadow-[0_10px_14px_0_rgba(23,51,107,0.14)] open:flex',
        className,
      )}
      isOpen={isOpen}
      onClose={onClose}
      {...props}
    >
      <div className="flex h-12 items-center gap-3">
        <IcModalSuccess aria-hidden className="shrink-0" />
        <div className="flex flex-col gap-0.5">
          <h2 id={titleId} className="text-heading-20 text-text-primary">
            지원 내용을 확인해 주세요
          </h2>
          <p className="text-body-14 text-text-secondary">
            {companyName} · {positionName}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 rounded-xl bg-surface-subtle px-4 py-3.5 text-body-14">
        <p className="text-label-14 text-text-primary">제출 서류</p>
        <p className="text-text-secondary">{documentSummary}</p>
      </div>

      <label className="flex items-center gap-1.5 text-body-14 text-text-primary">
        <input
          type="checkbox"
          checked={hasAgreed}
          className="size-4 accent-blue-90"
          onChange={(e) => setHasAgreed(e.target.checked)}
        />
        지원 서류 및 개인정보 제공에 동의합니다.
      </label>

      <div className="flex gap-2.5">
        <button
          type="button"
          className="flex h-12 w-40 items-center justify-center rounded-[10px] border border-border-default text-label-14 text-text-primary"
          onClick={onClose}
        >
          취소
        </button>
        <button
          type="button"
          disabled={!hasAgreed || isSubmitting}
          className="flex h-12 flex-1 items-center justify-center rounded-[10px] bg-blue-90 text-label-14 text-white disabled:bg-surface-subtle disabled:text-text-tertiary"
          onClick={onSubmit}
        >
          {isSubmitting ? '지원하는 중...' : '최종 지원하기'}
        </button>
      </div>
    </ModalDialog>
  );
};

export default ModalApplyReview;
