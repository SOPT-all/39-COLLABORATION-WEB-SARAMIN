// 드래그 가능한 지원 패키지 묶음의 정보와 상태를 표시하는 컴포넌트
// props: title - 지원 패키지 이름
//        meta - 포함 서류 등 부가 정보
//        state - 현재 상태 (기본 'default')
//        loadingSlot - 로딩 시 표시할 스켈레톤 UI
//        className - 추가 스타일
// 상태: default, grabbed, disabled, loading
// 재사용: StackApplicationDocument - 지원 서류 스택 아이콘
//         DragHandleButton - 드래그 핸들 표시
// TODO: 실제 스켈레톤 컴포넌트 확인 후 loadingSlot 연결
// 데이터: 실제 드래그 동작과 패키지 상태는 부모 컴포넌트에서 관리

import { useId } from 'react';

import type { BundleApplicationProps } from '@/shared/components/bundle-application/bundle-application.types';
import DragHandleButton from '@/shared/components/button/drag-handle-button';
import StackApplicationDocument from '@/shared/components/stack-application-document/stack-application-document';
import { cn } from '@/shared/utils/cn';

// 상태에 따른 테두리, 배경색, 그림자 스타일
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
          {/* 로딩 시 전달받은 스켈레톤 또는 기본 안내 문구 표시 */}
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
