import type { ReactElement } from 'react';

import type { StateMessageAction } from '@/shared/components/state-message/state-message.types';

export type StateSearchResultsContentState =
  'loading' | 'empty' | 'error' | 'refreshing';

interface StateSearchResultsBaseProps {
  className?: string;
}

export interface StateSearchResultsLoadingProps extends StateSearchResultsBaseProps {
  contentState: 'loading';
  /** Search-result skeletons; the parent owns the loading label and outer layout. */
  loadingSlot: ReactElement;
}

export interface StateSearchResultsMessageProps extends StateSearchResultsBaseProps {
  contentState: 'empty' | 'error';
  action?: StateMessageAction;
}

export interface StateSearchResultsRefreshingProps extends StateSearchResultsBaseProps {
  contentState: 'refreshing';
  /** The existing results remain rendered here while the parent fetches new data. */
  resultsSlot: ReactElement;
  /** A 914x4 loading indicator supplied by its owner. */
  loaderSlot: ReactElement;
}

export type StateSearchResultsProps =
  | StateSearchResultsLoadingProps
  | StateSearchResultsMessageProps
  | StateSearchResultsRefreshingProps;
