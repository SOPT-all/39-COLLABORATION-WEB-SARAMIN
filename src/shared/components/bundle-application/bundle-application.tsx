import { useId } from 'react';

import type { BundleApplicationProps } from '@/shared/components/bundle-application/bundle-application.types';
import DragHandleButton from '@/shared/components/button/drag-handle-button';
import StackApplicationDocument from '@/shared/components/stack-application-document/stack-application-document';
import { cn } from '@/shared/utils/cn';

const STATE_CLASS_NAMES = {
  default:
    'gap-2.5 rounded-xl border-border-default bg-surface-default p-2.5 drop-shadow-[0_6px_9px_rgba(23,51,107,0.1)]',
  grabbed:
    'gap-2.5 rounded-xl border-2 border-action-primary bg-surface-default p-2.5 drop-shadow-[0_8px_12px_rgba(29,78,216,0.18)]',
  disabled:
    'gap-2.5 rounded-xl border-border-default bg-coral-20 p-2.5 drop-shadow-[0_6px_9px_rgba(23,51,107,0.1)]',
  loading:
    'justify-center rounded-lg border-border-default bg-surface-default p-3',
};

const BundleApplication = ({
  title,
  meta,
  state = 'default',
  loadingSlot,
  className,
}: BundleApplicationProps) => {
  const titleId = useId();
  const isLoading = state === 'loading';
  const isDisabled = state === 'disabled';

  return (
    <section
      aria-label={isLoading ? `${title} 불러오는 중` : undefined}
      aria-labelledby={isLoading ? undefined : titleId}
      aria-busy={isLoading}
      data-state={state}
      className={cn(
        'flex h-20 w-61 shrink-0 items-center border',
        STATE_CLASS_NAMES[state],
        className,
      )}
    >
      {isLoading ? (
        <div className="h-full w-full">
          {loadingSlot ?? (
            <p className="flex h-full items-center justify-center text-center text-caption-11 text-text-secondary">
              지원 패키지를 불러오는 중입니다.
            </p>
          )}
        </div>
      ) : (
        <>
          <StackApplicationDocument state={state} />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5 overflow-hidden whitespace-nowrap">
            <h3
              id={titleId}
              className={cn(
                'text-label-14',
                isDisabled ? 'text-coral-110' : 'text-text-primary',
              )}
            >
              {title}
            </h3>
            <p
              className={cn(
                'text-caption-11',
                isDisabled ? 'text-coral-110' : 'text-text-secondary',
              )}
            >
              {meta}
            </p>
          </div>
          <DragHandleButton
            aria-hidden
            tabIndex={-1}
            className="shrink-0"
            isGrabbed={state === 'grabbed'}
            disabled={isDisabled}
          />
        </>
      )}
    </section>
  );
};

export default BundleApplication;
