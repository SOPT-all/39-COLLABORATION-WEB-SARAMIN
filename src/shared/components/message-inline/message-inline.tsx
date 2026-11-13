// 정보, 오류, 성공 상태의 안내 메시지를 표시하는 공통 컴포넌트
// props : tone - 알림 종류 (info / error / success, 기본 'info')
//         message - 화면에 표시할 안내 문구
//         action - 버튼 문구(label)와 클릭 함수(onClick), 선택 사항
//         className - 추가 스타일
// 재사용 : 희진님 action-button
// 데이터 : 메시지 문구는 사용하는 부모 컴포넌트에서 전달

// TODO: ActionButton PR 머지 후 다시 사용

//import ActionButton from '@/shared/components/button/action-button';
import type { MessageInlineProps } from '@/shared/components/message-inline/message-inline.types';
import { cn } from '@/shared/utils/cn';

// 상태별 배경색과 표시점 색상
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

      {/* 오류 상태이고 action이 있을 때만 버튼 표시 */}

      {/* ActionButton 머지 전 임시 버튼 */}
      {tone === 'error' && action && (
        <button
          type="button"
          onClick={action.onClick}
          className="flex h-8 w-24 shrink-0 items-center justify-center rounded-md border border-border-default bg-surface-default px-3 text-body-12 whitespace-nowrap text-blue-90"
        >
          {action.label}
        </button>
      )}
      {/* TODO: ActionButton 머지 후 아래 버튼으로 교체 */}
      {/*
        {tone === 'error' && action && (
          <ActionButton onClick={action.onClick}>
            {action.label}
          </ActionButton>
        )}
      */}
    </div>
  );
};

export default MessageInline;
