import type { ComponentProps } from 'react';

import BadgeMetadata from '@/shared/components/badge/badge-metadata';
import { cn } from '@/shared/utils/cn';

// 페이지 연결: 상태, 공고명, 지역·경력, 마감, 지원 뱃지는 status, title, meta, deadline, badge입니다.
// 기본값은 피그마 예시 문구입니다.
interface ListCompanyPositionProps extends ComponentProps<'div'> {
  status?: string;
  title?: string;
  meta?: string;
  deadline?: string;
  badge?: string;
}

const ListCompanyPosition = ({
  status = '채용중',
  title = '[콘텐츠유통팀] 판로개척 담당자',
  meta = '서울 서대문구 | 경력3년↑ | 대졸↑',
  deadline = '~11.01(일)',
  badge = '홈페이지 지원',
  className,
  ...props
}: ListCompanyPositionProps) => {
  return (
    <div
      className={cn(
        'flex min-h-11.25 w-full items-center gap-3 border-b border-gray-30 text-caption-12',
        className,
      )}
      {...props}
    >
      <p className="w-21.25 shrink-0 text-center text-blue-80">{status}</p>
      <p className="min-w-45 flex-1 text-gray-120">{title}</p>
      <p className="max-w-54 min-w-35 flex-1 text-gray-70">{meta}</p>
      <p className="w-18 shrink-0 text-right text-gray-70">{deadline}</p>
      <BadgeMetadata variant="blue" className="h-auto shrink-0 py-1.25">
        {badge}
      </BadgeMetadata>
    </div>
  );
};

export default ListCompanyPosition;
