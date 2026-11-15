// [스펙] 드롭존(지원 패키지) 상태 표
// 역할   : 상태 12개마다 톤 · 아이콘 · 제목 · 설명 · 뱃지 문구를 모아 둠. 컴포넌트는 이 표를 읽기만 함
// 톤     : 12개를 색으로 묶으면 4가지 (neutral 회색 · info 파랑 · success 초록 · danger 코랄)
// 아이콘 : applied → success, ineligible → closed, needs_document → error 와 같은 그림이라 공유
// 문구   : 피그마 그대로 고정. "서류 3/3"처럼 숫자가 바뀌는 건 API 나오면 분리 검토

import type { ComponentType, SVGProps } from 'react';

import IcStateClosed from '@/shared/assets/icons/ic-state-closed.svg?react';
import IcStateDragOver from '@/shared/assets/icons/ic-state-drag-over.svg?react';
import IcStateDragReady from '@/shared/assets/icons/ic-state-drag-ready.svg?react';
import IcStateError from '@/shared/assets/icons/ic-state-error.svg?react';
import IcStateExternal from '@/shared/assets/icons/ic-state-external.svg?react';
import IcStateIdle from '@/shared/assets/icons/ic-state-idle.svg?react';
import IcStateNeedsQuestions from '@/shared/assets/icons/ic-state-needs-questions.svg?react';
import IcStateSubmitting from '@/shared/assets/icons/ic-state-submitting.svg?react';
import IcStateSuccess from '@/shared/assets/icons/ic-state-success.svg?react';

export const DROP_ZONE_TONE_CLASS_NAMES = {
  neutral: 'bg-surface-subtle',
  info: 'bg-surface-blue-subtle',
  success: 'bg-green-30',
  danger: 'bg-coral-30',
};

export type DropZoneTone = keyof typeof DROP_ZONE_TONE_CLASS_NAMES;

export interface DropZoneApplicationState {
  tone: DropZoneTone;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  badge: string;
  isBadgeHighlighted?: boolean;
}

export type DropZoneApplicationStatus =
  | 'idle'
  | 'dragReady'
  | 'dragOver'
  | 'submitting'
  | 'success'
  | 'applied'
  | 'needsDocument'
  | 'needsQuestions'
  | 'error'
  | 'external'
  | 'closed'
  | 'ineligible';

export const DROP_ZONE_APPLICATION_STATES: Record<
  DropZoneApplicationStatus,
  DropZoneApplicationState
> = {
  idle: {
    tone: 'neutral',
    icon: IcStateIdle,
    title: '패키지 놓고 지원',
    description: '지원 서류 3종',
    badge: '서류 3/3',
  },
  dragReady: {
    tone: 'info',
    icon: IcStateDragReady,
    title: '지원 가능한 공고',
    description: '패키지를 끌어오세요',
    badge: '서류 3/3',
    isBadgeHighlighted: true,
  },
  dragOver: {
    tone: 'info',
    icon: IcStateDragOver,
    title: '놓으면 바로 지원',
    description: '5초 안에 취소 가능',
    badge: '지원 준비 완료',
    isBadgeHighlighted: true,
  },
  submitting: {
    tone: 'info',
    icon: IcStateSubmitting,
    title: '지원 요건 확인 중',
    description: '잠시만 기다려 주세요',
    badge: '검증 중',
    isBadgeHighlighted: true,
  },
  success: {
    tone: 'success',
    icon: IcStateSuccess,
    title: '지원 완료',
    description: '방금 전',
    badge: '지원 내역',
  },
  applied: {
    tone: 'success',
    icon: IcStateSuccess,
    title: '지원 완료',
    description: '지원 내역 확인',
    badge: '오늘 14:32',
  },
  needsDocument: {
    tone: 'danger',
    icon: IcStateError,
    title: '서류 1개 필요',
    description: '포트폴리오 추가',
    badge: '준비 2/3',
  },
  needsQuestions: {
    tone: 'danger',
    icon: IcStateNeedsQuestions,
    title: '질문 2개 필요',
    description: '답변 후 지원 가능',
    badge: '준비 2/3',
  },
  error: {
    tone: 'danger',
    icon: IcStateError,
    title: '지원하지 못했어요',
    description: '다시 시도해 주세요',
    badge: '재시도',
  },
  external: {
    tone: 'neutral',
    icon: IcStateExternal,
    title: '홈페이지 지원',
    description: '상세에서 방법 확인',
    badge: '기업 지원',
  },
  closed: {
    tone: 'neutral',
    icon: IcStateClosed,
    title: '접수 마감',
    description: '비슷한 공고 보기',
    badge: '접수 종료',
  },
  ineligible: {
    tone: 'neutral',
    icon: IcStateClosed,
    title: '지원 조건 미충족',
    description: '경력 조건 확인',
    badge: '지원 불가',
  },
};
