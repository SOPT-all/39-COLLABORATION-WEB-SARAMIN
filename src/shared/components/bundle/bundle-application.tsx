// [스펙] BundleApplication
// 역할   : 스티키 허브 안의 지원 패키지 카드. 사용자가 이걸 끌어서 공고 드롭존에 놓음
// props  : state - default · grabbed · disabled (기본 default)
//          title · meta - 문구. 기본값 '지원 패키지' · '필수 서류 3개 · 최신'
//          className, 나머지 div 속성 통과 (onDragStart 등은 페이지에서 연결)
// 상태   : state에 따라 배경 · 테두리 · 그림자 · 글자색이 바뀜. 클래스 표에서 꺼냄
//          grabbed → 핸들 isGrabbed, disabled → 핸들 disabled
// 구조   : [StackApplicationDocument] [title / meta] [DragHandleButton]
// 재사용 : StackApplicationDocument, 주형 님 DragHandleButton
// 접근성 : 핸들 aria-label을 '지원 패키지 끌기'로 덮어씀. 그림은 aria-hidden

import type { ComponentProps } from 'react';

import StackApplicationDocument, {
  type BundleApplicationState,
} from '@/shared/components/bundle/stack-application-document';
import DragHandleButton from '@/shared/components/button/drag-handle-button';
import { cn } from '@/shared/utils/cn';

const STATE_CLASS_NAMES = {
  default: {
    card: 'border border-border-default bg-surface-default shadow-card',
    title: 'text-text-primary',
    meta: 'text-text-secondary',
  },
  grabbed: {
    card: 'border-2 border-blue-90 bg-surface-default shadow-card-strong',
    title: 'text-text-primary',
    meta: 'text-text-secondary',
  },
  disabled: {
    card: 'border border-border-default bg-coral-20 shadow-card',
    title: 'text-coral-110',
    meta: 'text-coral-110',
  },
};

interface BundleApplicationProps extends ComponentProps<'div'> {
  state?: BundleApplicationState;
  title?: string;
  meta?: string;
}

const BundleApplication = ({
  state = 'default',
  title = '지원 패키지',
  meta = '필수 서류 3개 · 최신',
  className,
  ...props
}: BundleApplicationProps) => {
  const {
    card,
    title: titleClassName,
    meta: metaClassName,
  } = STATE_CLASS_NAMES[state];

  return (
    <div
      className={cn(
        'flex h-20 w-61 items-center gap-2.5 rounded-xl p-2.5',
        card,
        className,
      )}
      {...props}
    >
      <StackApplicationDocument state={state} />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className={cn('truncate text-label-14', titleClassName)}>{title}</p>
        <p className={cn('truncate text-caption-11', metaClassName)}>{meta}</p>
      </div>
      <DragHandleButton
        aria-label="지원 패키지 끌기"
        isGrabbed={state === 'grabbed'}
        disabled={state === 'disabled'}
      />
    </div>
  );
};

export default BundleApplication;
