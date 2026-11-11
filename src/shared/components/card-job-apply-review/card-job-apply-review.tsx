import { useId } from 'react';

import ModalButton from '@/shared/components/button/modal-button';
import type { CardJobApplyReviewProps } from '@/shared/components/card-job-apply-review/card-job-apply-review.types';
import { cn } from '@/shared/utils/cn';

import IcCheck from '@/shared/assets/icons/ic-check.svg?react';
import IcModalSuccess from '@/shared/assets/icons/ic-modal-success.svg?react';

const CardJobApplyReview = ({
  title = '지원 내용을 확인해 주세요',
  subtitle,
  sectionLabel = '제출 서류',
  documentSummary,
  consentLabel = '지원 서류 및 개인정보 제공에 동의합니다.',
  cancelLabel = '취소',
  submitLabel = '최종 지원하기',
  onCancel,
  onSubmit,
  className,
}: CardJobApplyReviewProps) => {
  const titleId = useId();

  return (
    <section
      aria-labelledby={titleId}
      className={cn(
        'flex h-82.5 w-140 shrink-0 flex-col items-start gap-4 rounded-[20px] bg-surface-default p-6 ring-1 ring-border-default drop-shadow-[0_10px_14px_rgba(23,51,107,0.14)] ring-inset',
        className,
      )}
    >
      <header className="flex h-12 w-full shrink-0 items-center gap-3">
        <IcModalSuccess aria-hidden className="shrink-0" />
        <div className="flex flex-col gap-0.5">
          <h2 id={titleId} className="text-heading-20 text-text-primary">
            {title}
          </h2>
          <p className="text-body-14 text-text-secondary">{subtitle}</p>
        </div>
      </header>
      <dl className="flex h-20.5 w-full shrink-0 flex-col gap-2 rounded-xl bg-surface-subtle px-4 py-3.5">
        <dt className="text-label-14 text-text-primary">{sectionLabel}</dt>
        <dd className="text-body-14 text-text-secondary">{documentSummary}</dd>
      </dl>
      <p className="flex items-center gap-1 text-body-14 text-text-primary">
        {/* Figma uses a font glyph, so its gray background has no separate color token. */}
        <span
          aria-hidden
          className="flex size-3.5 shrink-0 items-center justify-center overflow-hidden rounded-[3px] bg-[#808080]"
        >
          <IcCheck className="shrink-0" />
        </span>
        <span>{consentLabel}</span>
      </p>
      <footer className="flex h-12 w-full shrink-0 gap-2.5">
        <ModalButton
          variant="secondary"
          className="h-12 w-40 shrink-0 rounded-[10px] text-text-primary"
          onClick={onCancel}
        >
          {cancelLabel}
        </ModalButton>
        <ModalButton
          variant="primary"
          className="h-12 min-w-0 flex-1 rounded-[10px]"
          onClick={onSubmit}
        >
          {submitLabel}
        </ModalButton>
      </footer>
    </section>
  );
};

export default CardJobApplyReview;
