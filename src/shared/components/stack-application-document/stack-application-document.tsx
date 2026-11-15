// 지원 서류를 스택 형태의 아이콘으로 표시하는 컴포넌트
// props: state - 아이콘 상태 (기본 'default')
//        className - 추가 스타일
// 상태: default, grabbed, disabled
// 재사용: IcApplicationDefault - 기본 및 드래그 중 아이콘
//         IcApplicationDisabled - 비활성화 아이콘
// 데이터: 실제 드래그 동작과 상태 변경은 부모 컴포넌트에서 관리

import type { StackApplicationDocumentProps } from '@/shared/components/stack-application-document/stack-application-document.types';
import { cn } from '@/shared/utils/cn';

import IcApplicationDefault from '@/shared/assets/icons/ic-application-default.svg?react';
import IcApplicationDisabled from '@/shared/assets/icons/ic-application-disabled.svg?react';

const StackApplicationDocument = ({
  state = 'default',
  className,
}: StackApplicationDocumentProps) => {
  // 비활성화 상태에서만 별도의 아이콘 사용
  const DocumentIcon =
    state === 'disabled' ? IcApplicationDisabled : IcApplicationDefault;

  return (
    <span
      aria-hidden
      data-state={state}
      className={cn('inline-flex h-12 w-10 shrink-0', className)}
    >
      <DocumentIcon className="shrink-0" />
    </span>
  );
};

export default StackApplicationDocument;
