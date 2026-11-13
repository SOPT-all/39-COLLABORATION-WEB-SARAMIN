// 지원 패키지의 서류 구성, 수정 정보 및 현재 상태를 표시하는 카드
// props: title - 패키지 이름
//        documentSummary - 포함된 서류 요약
//        updatedLabel - 최근 수정 정보
//        state - 카드 상태 (기본 'default')
//        className - 추가 스타일
// 상태: default, selected, incomplete, ready
// 재사용: BadgeModalStatus - 패키지 상태 배지
// 데이터: 실제 패키지 정보와 선택 상태는 부모 컴포넌트에서 관리

import { useId } from 'react';

import BadgeModalStatus from '@/shared/components/badge/badge-modal-status';
import type { CardPackageProps } from '@/shared/components/card-package/card-package.types';
import { cn } from '@/shared/utils/cn';

// 상태별 카드 스타일과 배지 문구 관리
const STATE_VARIANTS = {
  default: {
    cardClassName: 'border-border-default bg-surface-default',
    badgeClassName: 'bg-surface-subtle',
    label: '기본',
  },
  selected: {
    cardClassName: 'border-action-primary bg-surface-blue-subtle',
    badgeClassName: 'bg-surface-subtle',
    label: '선택됨',
  },
  incomplete: {
    cardClassName: 'border-status-danger bg-surface-default',
    badgeClassName: 'bg-coral-20',
    label: '서류 누락',
  },
  ready: {
    cardClassName: 'border-border-default bg-surface-default',
    badgeClassName: 'bg-green-20',
    label: '지원 가능',
  },
};

const CardPackage = ({
  title,
  documentSummary,
  updatedLabel,
  state = 'default',
  className,
}: CardPackageProps) => {
  const titleId = useId();
  const variant = STATE_VARIANTS[state];

  return (
    <article
      aria-labelledby={titleId}
      data-state={state}
      className={cn(
        'flex h-40 w-82.5 shrink-0 flex-col items-start gap-3 rounded-xl border p-5',
        variant.cardClassName,
        className,
      )}
    >
      <header className="flex h-7 w-full shrink-0 items-center gap-6.5">
        <h3
          id={titleId}
          className="shrink-0 text-title-16 whitespace-nowrap text-text-primary"
        >
          {title}
        </h3>

        <BadgeModalStatus
          variant="neutral"
          className={cn('h-6.5 shrink-0 py-1', variant.badgeClassName)}
        >
          {variant.label}
        </BadgeModalStatus>
      </header>

      <p className="shrink-0 text-caption-12 whitespace-nowrap text-text-secondary">
        {documentSummary}
      </p>

      <p className="shrink-0 text-caption-12 whitespace-nowrap text-text-secondary">
        {updatedLabel}
      </p>
    </article>
  );
};

export default CardPackage;
