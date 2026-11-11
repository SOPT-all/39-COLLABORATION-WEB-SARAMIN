import { useId } from 'react';

import ModalButton from '@/shared/components/button/modal-button';
import type { StateMessageProps } from '@/shared/components/state-message/state-message.types';
import { cn } from '@/shared/utils/cn';

import IcKindEmpty from '@/shared/assets/icons/ic-kind-empty.svg?react';
import IcKindError from '@/shared/assets/icons/ic-kind-error.svg?react';
import IcKindOffline from '@/shared/assets/icons/ic-kind-offline.svg?react';

const STATUS_ICONS = {
  empty: IcKindEmpty,
  error: IcKindError,
  offline: IcKindOffline,
};

const SCOPE_CLASS_NAMES = {
  inline: 'h-18 gap-3 p-3',
  section: 'h-55 flex-col gap-2 px-8 py-6',
};

const StateMessage = ({
  kind,
  scope = 'inline',
  title,
  description,
  action,
  className,
}: StateMessageProps) => {
  const titleId = useId();
  const descriptionId = useId();
  const isSection = scope === 'section';
  const StatusIcon = STATUS_ICONS[kind];

  return (
    <section
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      data-kind={kind}
      data-scope={scope}
      className={cn(
        'flex w-130 shrink-0 items-center justify-center rounded-lg border border-border-default bg-surface-default',
        SCOPE_CLASS_NAMES[scope],
        className,
      )}
    >
      <span
        aria-hidden
        className={cn('shrink-0', isSection ? 'size-12' : 'size-6')}
      >
        {/* Scale the complete 24px asset to preserve the glyph, stroke and padding ratios. */}
        <StatusIcon
          className={cn('block', isSection && 'origin-top-left scale-200')}
        />
      </span>
      <div
        className={cn(
          'flex flex-1 flex-col justify-center gap-1 overflow-hidden',
          isSection
            ? 'min-h-0 w-106 items-center text-center'
            : 'min-w-0 items-start whitespace-nowrap',
        )}
      >
        <h3 id={titleId} className="shrink-0 text-title-14 text-text-primary">
          {title}
        </h3>
        <p
          id={descriptionId}
          className="shrink-0 text-body-12 text-text-secondary"
        >
          {description}
        </p>
      </div>
      {action && (
        <ModalButton
          variant="secondary"
          className="h-8 w-24 shrink-0 rounded-md px-3 text-body-12"
          onClick={action.onClick}
        >
          {action.label}
        </ModalButton>
      )}
    </section>
  );
};

export default StateMessage;
