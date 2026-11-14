// 드래그 가능한 지원 패키지 묶음의 정보와 상태를 표시하는 컴포넌트
// props: title - 지원 패키지 이름
//        meta - 포함 서류 등 부가 정보
//        state - 현재 상태 (기본 'default')
//        loadingSlot - 로딩 시 표시할 UI (기본 SkeletonApplicationBundle)
//        className - 추가 스타일
// 상태: default, grabbed, disabled, loading
// 재사용: StackApplicationDocument - 지원 서류 스택 아이콘
//         DragHandleButton - 드래그 핸들 표시
//         종현님 SkeletonApplicationBundle - 로딩 상태의 전체 카드 UI
// 데이터: 실제 드래그 동작과 패키지 상태는 부모 컴포넌트에서 관리

import { useId } from 'react';

import type { BundleApplicationProps } from '@/shared/components/bundle-application/bundle-application.types';
import DragHandleButton from '@/shared/components/button/drag-handle-button';
import SkeletonApplicationBundle from '@/shared/components/skeleton/skeleton-application-bundle';
import StackApplicationDocument from '@/shared/components/stack-application-document/stack-application-document';
import { cn } from '@/shared/utils/cn';

// 일반 상태에서는 카드 스타일 적용, 로딩 상태에서는 스켈레톤이 전체 UI 담당
const STATE_CLASS_NAMES = {
  default:
    'gap-2.5 rounded-xl border border-border-default bg-surface-default p-2.5 drop-shadow-[0_6px_9px_rgba(23,51,107,0.1)]',
  grabbed:
    'gap-2.5 rounded-xl border-2 border-action-primary bg-surface-default p-2.5 drop-shadow-[0_8px_12px_rgba(29,78,216,0.18)]',
  disabled:
    'gap-2.5 rounded-xl border border-border-default bg-coral-20 p-2.5 drop-shadow-[0_6px_9px_rgba(23,51,107,0.1)]',
  loading: '',
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
        'flex h-20 w-61 shrink-0 items-center',
        STATE_CLASS_NAMES[state],
        className,
      )}
    >
      {isLoading ? (
        // 스켈레톤 자체에 테두리, 여백, 크기가 있으므로 외부 스타일을 중복 적용하지 않음
        (loadingSlot ?? <SkeletonApplicationBundle />)
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
