import type { StackApplicationDocumentProps } from '@/shared/components/stack-application-document/stack-application-document.types';
import { cn } from '@/shared/utils/cn';

import IcApplicationDefault from '@/shared/assets/icons/ic-application-default.svg?react';
import IcApplicationDisabled from '@/shared/assets/icons/ic-application-disabled.svg?react';

const StackApplicationDocument = ({
  state = 'default',
  className,
}: StackApplicationDocumentProps) => {
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
