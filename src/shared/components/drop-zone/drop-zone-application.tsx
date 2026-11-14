// [스펙] DropZoneApplication
// 역할   : 공고 옆에서 지원 패키지를 끌어다 놓는 영역. 컴포넌트 1개가 상태 12개를 표현
// props  : status - 상태 12개 중 하나 (기본 'idle'). 이 값 하나로 배경 · 아이콘 · 문구 · 뱃지가 모두 정해짐
//          className - 크기 · 여백 조정
//          onDrop · onDragOver 등 드래그 이벤트는 div 속성으로 받음. 실제 동작은 페이지에서 연결
// 상태   : 색 · 아이콘 · 문구는 drop-zone-application-states.ts 표에서 꺼냄. 여기에는 if 분기 없음
// 재사용 : 주형 님 ic-state-* 아이콘(32px 흰 배경 박스 포함), BadgeDropZoneStatus(하단 뱃지)
// 접근성 : 상태 문구가 그대로 읽히면 되므로 숨기지 않음. 아이콘만 aria-hidden

import type { ComponentProps } from 'react';

import BadgeDropZoneStatus from '@/shared/components/badge/badge-drop-zone-status';
import {
  DROP_ZONE_APPLICATION_STATES,
  DROP_ZONE_TONE_CLASS_NAMES,
  type DropZoneApplicationStatus,
} from '@/shared/components/drop-zone/drop-zone-application-states';
import { cn } from '@/shared/utils/cn';

interface DropZoneApplicationProps extends ComponentProps<'div'> {
  status?: DropZoneApplicationStatus;
}

const DropZoneApplication = ({
  status = 'idle',
  className,
  ...props
}: DropZoneApplicationProps) => {
  const {
    tone,
    icon: Icon,
    title,
    description,
    badge,
    isBadgeHighlighted,
  } = DROP_ZONE_APPLICATION_STATES[status];

  return (
    <div
      className={cn(
        'flex h-63 w-28 flex-col items-center gap-2.5 border-l border-border-default px-2.5 pt-4 pb-3.5 text-center',
        DROP_ZONE_TONE_CLASS_NAMES[tone],
        className,
      )}
      {...props}
    >
      <Icon aria-hidden className="size-8 shrink-0" />
      <p className="h-9 w-23 text-label-12 break-keep text-text-primary">
        {title}
      </p>
      <p className="h-8 w-23 text-caption-11 break-keep text-text-secondary">
        {description}
      </p>
      <BadgeDropZoneStatus
        isHighlighted={isBadgeHighlighted}
        className="mt-auto"
      >
        {badge}
      </BadgeDropZoneStatus>
    </div>
  );
};

export default DropZoneApplication;
