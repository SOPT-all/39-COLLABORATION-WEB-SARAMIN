// [스펙] 스티키 허브 상태 표
// 역할   : status 4개마다 뱃지 · 안내 문구 · 요약 카드 · 패키지 카드 · 바깥 테두리를 모아 둠. 컴포넌트는 이 표를 읽기만 함
// 문구   : 피그마 그대로 고정. "3/3"처럼 숫자가 바뀌는 건 API 나오면 분리 검토
// loading: 본문을 통째로 스켈레톤으로 바꾸므로 표에는 뱃지 · 문구만 있고 쓰이지 않음

import type { BundleApplicationState } from '@/shared/components/bundle/stack-application-document';

export type HubStickyStatus =
  'ready' | 'dragging' | 'needsDocument' | 'loading';

export interface HubStickyState {
  badgeVariant: 'primary' | 'danger';
  badge: string;
  description: string;
  summaryTone: 'ready' | 'warning';
  summaryTitle: string;
  summaryDescription: string;
  bundleState: BundleApplicationState;
  isOutlined?: boolean;
}

export const HUB_STICKY_STATES: Record<HubStickyStatus, HubStickyState> = {
  ready: {
    badgeVariant: 'primary',
    badge: '3/3 완료',
    description: '준비는 한 번, 지원은 드롭 한 번',
    summaryTone: 'ready',
    summaryTitle: '필수 서류 3/3 준비',
    summaryDescription: '최근 업데이트 10분 전',
    bundleState: 'default',
  },
  dragging: {
    badgeVariant: 'primary',
    badge: '지원 모드',
    description: '원하는 공고의 지원 영역에 놓아주세요',
    summaryTone: 'ready',
    summaryTitle: '바로 지원하기',
    summaryDescription: '최근 업데이트 10분 전',
    bundleState: 'grabbed',
    isOutlined: true,
  },
  needsDocument: {
    badgeVariant: 'danger',
    badge: '1개 필요',
    description: '서류 보완시 다시 바로 지원할 수 있어요',
    summaryTone: 'warning',
    summaryTitle: '필수 서류 2/3 준비',
    summaryDescription: '경력기술서 보완 필요',
    bundleState: 'disabled',
  },
  loading: {
    badgeVariant: 'primary',
    badge: '',
    description: '',
    summaryTone: 'ready',
    summaryTitle: '',
    summaryDescription: '',
    bundleState: 'default',
  },
};
