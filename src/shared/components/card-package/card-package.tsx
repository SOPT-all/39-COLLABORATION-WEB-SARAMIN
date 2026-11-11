import { useId } from 'react';

import BadgeModalStatus from '@/shared/components/badge/badge-modal-status';
import type { CardPackageProps } from '@/shared/components/card-package/card-package.types';
import { cn } from '@/shared/utils/cn';

const STATE_VARIANTS = {
  default: {
    cardClassName: 'border-border-default bg-surface-default',
    badgeClassName: 'bg-surface-subtle',
    label: '기본',
  },
  selected: {
    cardClassName: 'border-action-primary bg-surface-blue-subtle',
    badgeClassName: 'bg-surface-subtle',
    label: '선택됨',
  },
  incomplete: {
    cardClassName: 'border-status-danger bg-surface-default',
    badgeClassName: 'bg-coral-20',
    label: '서류 누락',
  },
  ready: {
    cardClassName: 'border-border-default bg-surface-default',
    badgeClassName: 'bg-green-20',
    label: '지원 가능',
  },
};

const CardPackage = ({
  title,
  documentSummary,
  updatedLabel,
  state = 'default',
  className,
}: CardPackageProps) => {
  const titleId = useId();
  const variant = STATE_VARIANTS[state];

  return (
    <article
      aria-labelledby={titleId}
      data-state={state}
      className={cn(
        'flex h-40 w-82.5 shrink-0 flex-col items-start gap-3 rounded-xl border p-5',
        variant.cardClassName,
        className,
      )}
    >
      <header className="flex h-7 w-full shrink-0 items-center gap-6.5">
        <h3
          id={titleId}
          className="shrink-0 text-title-16 whitespace-nowrap text-text-primary"
        >
          {title}
        </h3>
        <BadgeModalStatus
          variant="neutral"
          className={cn('h-6.5 shrink-0 py-1', variant.badgeClassName)}
        >
          {variant.label}
        </BadgeModalStatus>
      </header>
      <p className="shrink-0 text-caption-12 whitespace-nowrap text-text-secondary">
        {documentSummary}
      </p>
      <p className="shrink-0 text-caption-12 whitespace-nowrap text-text-secondary">
        {updatedLabel}
      </p>
    </article>
  );
};

export default CardPackage;
