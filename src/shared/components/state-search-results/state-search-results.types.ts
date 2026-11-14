import type { ReactElement } from 'react';

import type { StateMessageAction } from '@/shared/components/state-message/state-message.types';

// 검색 결과 영역의 상태: 최초 로딩 / 결과 없음 / 오류 / 기존 결과 갱신
export type StateSearchResultsContentState =
  'loading' | 'empty' | 'error' | 'refreshing';

// 모든 상태에서 공통으로 사용하는 속성
interface StateSearchResultsBaseProps {
  className?: string;
}

// 최초 로딩 시 부모가 스켈레톤 UI를 전달
export interface StateSearchResultsLoadingProps extends StateSearchResultsBaseProps {
  contentState: 'loading';
  loadingSlot: ReactElement;
}

// 결과 없음 또는 오류 발생 시 안내 메시지와 선택적 버튼 표시
export interface StateSearchResultsMessageProps extends StateSearchResultsBaseProps {
  contentState: 'empty' | 'error';
  action?: StateMessageAction;
}

// 갱신 중에는 기존 검색 결과와 로딩 표시를 함께 유지
export interface StateSearchResultsRefreshingProps extends StateSearchResultsBaseProps {
  contentState: 'refreshing';
  resultsSlot: ReactElement;
  loaderSlot: ReactElement;
}

// 현재 상태에 따라 필요한 props를 다르게 검사
export type StateSearchResultsProps =
  | StateSearchResultsLoadingProps
  | StateSearchResultsMessageProps
  | StateSearchResultsRefreshingProps;
