// 검색 결과 영역의 로딩, 빈 결과, 오류, 갱신 상태를 표시하는 컴포넌트
// props: contentState - 현재 검색 결과 상태
//        loadingSlot - 최초 로딩 시 표시할 스켈레톤
//        resultsSlot, loaderSlot - 갱신 중 유지할 결과와 로딩 표시
//        action - 결과 없음 또는 오류 상태에서 사용할 버튼 정보
//        className - 추가 스타일
// 재사용: StateMessage - 빈 결과 및 오류 안내 메시지
// 슬롯으로 전달받을 UI:
//   loadingSlot - SkeletonSearchResultItem
//   loaderSlot - LoaderBar
//   resultsSlot - RowSearchResult
// 데이터: 검색 요청 및 결과 데이터는 부모 컴포넌트에서 관리

import StateMessage from '@/shared/components/state-message/state-message';
import type { StateSearchResultsProps } from '@/shared/components/state-search-results/state-search-results.types';
import { cn } from '@/shared/utils/cn';

// 검색 결과에 맞는 안내 문구 관리
const MESSAGE_CONTENTS = {
  empty: {
    title: '검색 결과가 없습니다',
    description: '검색어나 필터 조건을 조정해 주세요',
  },
  error: {
    title: '정보를 불러오지 못했습니다',
    description: '입력값은 유지됩니다. 잠시 후 다시 시도해 주세요',
  },
};

const StateSearchResults = (props: StateSearchResultsProps) => {
  const isLoading = props.contentState === 'loading';
  const isRefreshing = props.contentState === 'refreshing';

  return (
    <section
      aria-label="검색 결과 상태"
      aria-busy={isLoading || isRefreshing}
      data-content-state={props.contentState}
      className={cn(
        'flex min-h-130 w-228.5 shrink-0 flex-col items-center justify-center bg-surface-default py-4',
        (isLoading || isRefreshing) && 'gap-3',
        props.className,
      )}
    >
      {props.contentState === 'loading' && (
        <>
          <p className="shrink-0 text-label-14 text-text-secondary">
            검색 결과를 불러오는 중입니다
          </p>
          <div className="w-full shrink-0">{props.loadingSlot}</div>
        </>
      )}

      {(props.contentState === 'empty' || props.contentState === 'error') && (
        <StateMessage
          kind={props.contentState}
          scope="section"
          {...MESSAGE_CONTENTS[props.contentState]}
          action={props.action}
          className="[&_button]:text-label-12"
        />
      )}

      {/* 갱신 중에는 기존 결과를 유지하고 로딩 진행 상태를 함께 표시 */}
      {props.contentState === 'refreshing' && (
        <>
          <div className="h-1 w-full shrink-0">{props.loaderSlot}</div>
          <div className="w-full shrink-0">{props.resultsSlot}</div>
          <p className="shrink-0 text-caption-12 text-text-secondary">
            기존 결과를 유지한 채 최신 공고를 확인하고 있습니다
          </p>
        </>
      )}
    </section>
  );
};

export default StateSearchResults;
