// 지원 요청 결과. unknown은 응답을 못 받아 접수 여부를 알 수 없는 경우예요. (타임아웃 등)
export type ApplyResult = 'success' | 'error' | 'unknown';

// 지원 플로우 모달 단계. idle이면 모달이 닫혀 있어요.
export type ApplyFlowStep = 'idle' | 'review' | 'submitting' | ApplyResult;

// 지원 패키지를 드롭한 공고 정보예요. 지원 내용 확인 모달에 그대로 보여줘요.
export interface ApplyTarget {
  recruitId: number;
  companyName: string;
  positionName: string;
  documentSummary: string;
}
