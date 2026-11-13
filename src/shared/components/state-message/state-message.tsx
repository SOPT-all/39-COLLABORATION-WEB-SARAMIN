// StateMessage: 검색 결과 없음, 오류, 네트워크 연결 문제 등의 안내 메시지 표시
// props: kind - 메시지 종류 (empty / error / offline)
//        scope - 배치 형태 (inline / section, 기본 'inline')
//        title, description - 부모에서 전달하는 제목과 설명
//        action - 선택적 버튼 정보(label, onClick)
//        className - 추가 스타일
// 재사용: 주형님 아이콘 3개, ActionButton(머지 후)을 사용
// TODO: ActionButton PR 머지 후 아래 import 사용

import { useId } from 'react';

// import ActionButton from '@/shared/components/button/action-button';
import type { StateMessageProps } from '@/shared/components/state-message/state-message.types';
import { cn } from '@/shared/utils/cn';

import IcKindEmpty from '@/shared/assets/icons/ic-kind-empty.svg?react';
import IcKindError from '@/shared/assets/icons/ic-kind-error.svg?react';
import IcKindOffline from '@/shared/assets/icons/ic-kind-offline.svg?react';

// 메시지 종류에 따라 표시할 아이콘
const STATUS_ICONS = {
  empty: IcKindEmpty,
  error: IcKindError,
  offline: IcKindOffline,
};

// 가로형과 세로형의 크기 및 배치를 분리하여 관리
const SCOPE_CLASS_NAMES = {
  inline: 'h-18 gap-3 p-3',
  section: 'h-55 flex-col gap-2 px-8 py-6',
};

const StateMessage = ({
  kind,
  scope = 'inline',
  title,
  description,
  action,
  className,
}: StateMessageProps) => {
  // 제목과 설명을 section의 접근성 속성에 연결하기 위한 고유 ID
  const titleId = useId();
  const descriptionId = useId();

  const isSection = scope === 'section';
  const StatusIcon = STATUS_ICONS[kind];

  return (
    <section
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      data-kind={kind}
      data-scope={scope}
      className={cn(
        'flex w-130 shrink-0 items-center justify-center rounded-lg border border-border-default bg-surface-default',
        SCOPE_CLASS_NAMES[scope],
        className,
      )}
    >
      <span
        aria-hidden
        className={cn('shrink-0', isSection ? 'size-12' : 'size-6')}
      >
        {/* 원본 SVG의 비율을 유지하면서 section에서만 아이콘을 2배 확대 */}
        <StatusIcon
          className={cn('block', isSection && 'origin-top-left scale-200')}
        />
      </span>

      <div
        className={cn(
          'flex flex-1 flex-col justify-center gap-1 overflow-hidden',
          isSection
            ? 'min-h-0 w-106 items-center text-center'
            : 'min-w-0 items-start whitespace-nowrap',
        )}
      >
        <h3 id={titleId} className="shrink-0 text-title-14 text-text-primary">
          {title}
        </h3>

        <p
          id={descriptionId}
          className="shrink-0 text-body-12 text-text-secondary"
        >
          {description}
        </p>
      </div>

      {/* action이 전달된 경우에만 버튼 표시 */}
      {action && (
        <button
          type="button"
          className="flex h-8 w-24 shrink-0 items-center justify-center rounded-md border border-border-default bg-surface-default px-3 text-body-12 whitespace-nowrap text-blue-90"
          onClick={action.onClick}
        >
          {action.label}
        </button>
      )}

      {/* TODO: ActionButton 머지 후 임시 버튼 교체 */}
      {/*
      {action && (
        <ActionButton onClick={action.onClick}>
          {action.label}
        </ActionButton>
      )}
      */}
    </section>
  );
};

export default StateMessage;
