import ModalButton from '@/shared/components/button/modal-button';
import type { MessageInlineProps } from '@/shared/components/message-inline/message-inline.types';
import { cn } from '@/shared/utils/cn';

const TONE_VARIANTS = {
  info: {
    backgroundClassName: 'bg-surface-blue-subtle',
    indicatorClassName: 'bg-action-primary',
  },
  error: {
    backgroundClassName: 'bg-coral-30',
    indicatorClassName: 'bg-status-danger',
  },
  success: {
    backgroundClassName: 'bg-surface-subtle',
    indicatorClassName: 'bg-status-success',
  },
};

const MessageInline = ({
  tone = 'info',
  message,
  action,
  className,
}: MessageInlineProps) => {
  const variant = TONE_VARIANTS[tone];

  return (
    <div
      data-tone={tone}
      className={cn(
        'flex h-12 w-130 items-center gap-2 rounded-lg px-3 py-2',
        variant.backgroundClassName,
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          'size-2 shrink-0 rounded-full',
          variant.indicatorClassName,
        )}
      />
      <p className="min-w-0 flex-1 text-body-12 text-text-primary">{message}</p>
      {tone === 'error' && action && (
        <ModalButton
          variant="secondary"
          className="h-8 w-24 shrink-0 rounded-md px-3 text-label-12"
          onClick={action.onClick}
        >
          {action.label}
        </ModalButton>
      )}
    </div>
  );
};

export default MessageInline;
