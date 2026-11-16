import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

// 페이지 연결: 항목 이름은 label, 내용은 value입니다.
interface ListCompanyFactProps extends ComponentProps<'dl'> {
  label: string;
  value: string;
}

const ListCompanyFact = ({
  label,
  value,
  className,
  ...props
}: ListCompanyFactProps) => {
  return (
    <dl
      className={cn('flex w-full items-start gap-3 text-caption-12', className)}
      {...props}
    >
      <dt className="w-17.5 shrink-0 text-gray-70">{label}</dt>
      <dd className="min-w-0 flex-1 text-text-secondary">{value}</dd>
    </dl>
  );
};

export default ListCompanyFact;
