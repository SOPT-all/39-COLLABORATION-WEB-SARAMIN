import StateMessage from '@/shared/components/state-message/state-message';
import type { StateSearchResultsProps } from '@/shared/components/state-search-results/state-search-results.types';
import { cn } from '@/shared/utils/cn';

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
        'flex h-130 w-228.5 shrink-0 flex-col items-center justify-center bg-surface-default py-4',
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
