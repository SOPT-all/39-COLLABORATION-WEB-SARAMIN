import type { ApplyResult } from '@/shared/types/apply-flow';

const MOCK_SUBMIT_DELAY_MS = 1500;

// 지원 API가 나오기 전까지 쓰는 목 제출 함수예요.
// 원하는 결과를 넘기면 잠깐 기다린 뒤 그 결과를 돌려줘요. (성공 · 실패 · 결과 모름 확인용)
export const createMockSubmitApplication =
  (result: ApplyResult = 'success') =>
  (): Promise<ApplyResult> =>
    new Promise((resolve) => {
      setTimeout(() => resolve(result), MOCK_SUBMIT_DELAY_MS);
    });
