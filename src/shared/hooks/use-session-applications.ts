import { useSyncExternalStore } from 'react';

import type { ApplyTarget } from '@/shared/types/apply-flow';
import type { MyDocuments } from '@/shared/types/my-documents';

// 이번 방문에서 지원을 마친 공고 한 건이에요.
// 지원 API가 없어서 화면에서만 기억하고, 새로고침하면 사라져요.
export interface SessionApplication {
  target: ApplyTarget;
  appliedAt: string; // ISO 문자열
  // 지원할 때 체크돼 있던 서류. 못 받았으면 없음
  myDocuments?: MyDocuments;
}

// 홈 드롭 지원과 비교 모달 바로 지원이 같은 기록을 써요. (기능명세서 FN-09 · FN-11 지원 경로)
// 홈 카드의 지원 완료 · 지원 내역 · 비교 모달의 지원 완료 표시가 모두 이 기록을 봐요.
let applications: SessionApplication[] = [];
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const getSnapshot = () => applications;

// 최근 지원이 앞에 오게 쌓아요.
const addApplication = (application: SessionApplication) => {
  applications = [application, ...applications];
  listeners.forEach((listener) => listener());
};

export const useSessionApplications = () => {
  const sessionApplications = useSyncExternalStore(subscribe, getSnapshot);
  return { sessionApplications, addApplication };
};
