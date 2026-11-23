export const ROUTES = {
  HOME: '/',
  SEARCH: '/search',
} as const;

// 다른 화면에서 홈으로 이동하며 지원 내역 모달을 바로 열 때 넘기는 location state예요.
// 비교 모달에서 바로 지원을 마치고 '지원 내역 보기'를 누르면 써요.
export const OPEN_APPLICATION_HISTORY_STATE = { openApplicationHistory: true };

export const checkIsOpenApplicationHistoryState = (state: unknown) =>
  typeof state === 'object' &&
  state !== null &&
  'openApplicationHistory' in state &&
  state.openApplicationHistory === true;
