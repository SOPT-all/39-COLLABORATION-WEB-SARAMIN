// [스펙] StackApplicationDocument
// 역할   : 지원 패키지 카드 왼쪽에 들어가는 서류 더미 그림. 서류 3종이 묶여 있다는 걸 보여줌
// props  : state - default · grabbed · disabled (기본 default)
//          className 통과
// 상태   : disabled만 코랄, 나머지는 파랑. 바탕색 · 종이 테두리색 · 맨 앞장 색이 바뀜
// 구조   : 40×48 바탕 위에 32×36 종이 3장이 어긋나게 겹침
// 접근성 : 장식이라 aria-hidden. 서류 개수는 카드 문구(meta)가 읽어 줌

import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

export type BundleApplicationState = 'default' | 'grabbed' | 'disabled';

const TONE_CLASS_NAMES = {
  blue: {
    base: 'bg-blue-20',
    back: 'border-blue-60 bg-surface-default',
    middle: 'border-blue-70 bg-surface-default',
    front: 'bg-blue-90',
  },
  coral: {
    base: 'bg-coral-40',
    back: 'border-coral-50 bg-surface-default',
    middle: 'border-coral-50 bg-surface-default',
    front: 'border border-coral-50 bg-surface-default',
  },
};

interface StackApplicationDocumentProps extends ComponentProps<'div'> {
  state?: BundleApplicationState;
}

const StackApplicationDocument = ({
  state = 'default',
  className,
  ...props
}: StackApplicationDocumentProps) => {
  const tone = TONE_CLASS_NAMES[state === 'disabled' ? 'coral' : 'blue'];

  return (
    <div
      aria-hidden
      className={cn(
        'relative h-12 w-10 shrink-0 rounded-[10px]',
        tone.base,
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          'absolute top-0.75 left-1.5 h-9 w-8 rounded-[5px] border',
          tone.back,
        )}
      />
      <span
        className={cn(
          'absolute top-1.5 left-1 h-9 w-8 rounded-[5px] border',
          tone.middle,
        )}
      />
      <span
        className={cn(
          'absolute top-2.25 left-0.5 h-9 w-8 rounded-[5px]',
          tone.front,
        )}
      />
    </div>
  );
};

export default StackApplicationDocument;
