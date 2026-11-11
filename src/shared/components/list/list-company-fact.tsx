import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

// 페이지 연결: 항목 이름은 label, 내용은 value입니다.
// label, value 기본값은 피그마 예시 문구입니다.
interface ListCompanyFactProps extends ComponentProps<'dl'> {
  label?: string;
  value?: string;
}

const ListCompanyFact = ({
  label = '설립일',
  value = '2013년 12월 17일 (업력 14년차)',
  className,
  ...props
}: ListCompanyFactProps) => {
  return (
    <dl
      className={cn('flex w-full items-start gap-3 text-caption-12', className)}
      {...props}
    >
      <dt className="w-[70px] shrink-0 text-gray-70">{label}</dt>
      <dd className="min-w-0 flex-1 text-text-secondary">{value}</dd>
    </dl>
  );
};

export default ListCompanyFact;
