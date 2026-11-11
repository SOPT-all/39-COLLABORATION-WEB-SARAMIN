import MessageInline from '@/shared/components/message-inline/message-inline';
import type { MessageInlineTone } from '@/shared/components/message-inline/message-inline.types';
import type {
  StateCompareEditProps,
  StateCompareEditState,
} from '@/shared/components/state-compare-edit/state-compare-edit.types';
import { cn } from '@/shared/utils/cn';

import IcLoadingSpinner from '@/shared/assets/icons/ic-loading-spinner.svg?react';

const FEEDBACK_CONTENTS = {
  default: {
    tone: 'info',
    message: '비교 항목을 편집하면 저장 버튼이 활성화됩니다',
  },
  error: {
    tone: 'error',
    message: '변경사항을 저장하지 못했습니다',
  },
  success: {
    tone: 'success',
    message: '변경사항이 저장되었습니다',
  },
} satisfies Record<
  Exclude<StateCompareEditState, 'loading'>,
  { tone: MessageInlineTone; message: string }
>;

const StateCompareEdit = (props: StateCompareEditProps) => {
  return (
    <div
      aria-busy={props.state === 'loading'}
      data-state={props.state ?? 'default'}
      className={cn('h-12 w-105 shrink-0', props.className)}
    >
      {props.state === 'loading' ? (
        <div className="flex h-full w-full items-center gap-2 px-4">
          <IcLoadingSpinner aria-hidden className="shrink-0" />
          <p className="text-body-12 whitespace-nowrap text-text-secondary">
            변경사항을 저장하는 중입니다
          </p>
        </div>
      ) : (
        <MessageInline
          {...FEEDBACK_CONTENTS[props.state ?? 'default']}
          action={
            props.state === 'error'
              ? { label: '다시 시도', onClick: props.onRetry }
              : undefined
          }
          className="h-full w-full"
        />
      )}
    </div>
  );
};

export default StateCompareEdit;
