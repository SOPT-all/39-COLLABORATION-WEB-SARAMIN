import { useCallback, useMemo, useSyncExternalStore } from 'react';

import type { CompareJob } from '@/shared/types/compare-job';

// 북마크(스크랩) API가 없어서 화면 상태로만 모아 둬요. 새로고침하면 초기화돼요.
// 홈 · 검색 · 비교 모달이 같은 상태를 써서 어디서 바꿔도 함께 바뀌어요. (기능명세서 FR-10)
interface BookmarkState {
  bookmarkById: ReadonlyMap<number, boolean>;
  // 스크랩한 공고의 비교용 정보. 스크랩한 순서대로 비교 모달에 보여 줘요.
  compareJobById: ReadonlyMap<number, CompareJob>;
}

let state: BookmarkState = {
  bookmarkById: new Map(),
  compareJobById: new Map(),
};
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getSnapshot = () => state;

const setBookmark = (
  id: number,
  isBookmarked: boolean,
  compareJob?: CompareJob,
) => {
  const compareJobById = new Map(state.compareJobById);
  if (isBookmarked && compareJob) compareJobById.set(id, compareJob);
  if (!isBookmarked) compareJobById.delete(id);

  state = {
    bookmarkById: new Map(state.bookmarkById).set(id, isBookmarked),
    compareJobById,
  };
  listeners.forEach((listener) => listener());
};

export const useBookmarks = () => {
  const { bookmarkById, compareJobById } = useSyncExternalStore(
    subscribe,
    getSnapshot,
  );

  const getIsBookmarked = useCallback(
    (id: number, initialIsBookmarked = false) =>
      bookmarkById.get(id) ?? initialIsBookmarked,
    [bookmarkById],
  );

  const bookmarkedJobs = useMemo(
    () => [...compareJobById.values()],
    [compareJobById],
  );

  return { getIsBookmarked, setBookmark, bookmarkedJobs };
};
