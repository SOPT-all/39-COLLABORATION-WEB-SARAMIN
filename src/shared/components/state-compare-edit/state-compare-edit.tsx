// 비교 편집의 저장 상태를 안내하는 컴포넌트
// props: state - 기본 / 로딩 / 오류 / 성공 상태 (기본 : default)
//        onRetry - 저장 실패 시 다시 시도할 함수 (error 상태에서 필수)
//        className - 추가 스타일
// 재사용 : 주형님 icon-loading-spinner, MessageInline(너비 변경)

import MessageInline from '@/shared/components/message-inline/message-inline';
import type { MessageInlineTone } from '@/shared/components/message-inline/message-inline.types';
import type {
  StateCompareEditProps,
  StateCompareEditState,
} from '@/shared/components/state-compare-edit/state-compare-edit.types';
import { cn } from '@/shared/utils/cn';

import IcLoadingSpinner from '@/shared/assets/icons/ic-loading-spinner.svg?react';

// 로딩을 제외한 상태별 알림 문구와 tone
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
      {/* 저장 중에는 MessageInline 대신 로딩 스피너와 안내 문구 표시 */}
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
