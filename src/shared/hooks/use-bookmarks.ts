import { useCallback, useSyncExternalStore } from 'react';

let bookmarkById: ReadonlyMap<number, boolean> = new Map();
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getSnapshot = () => bookmarkById;

const setBookmark = (id: number, isBookmarked: boolean) => {
  bookmarkById = new Map(bookmarkById).set(id, isBookmarked);
  listeners.forEach((listener) => listener());
};

export const useBookmarks = () => {
  const bookmarks = useSyncExternalStore(subscribe, getSnapshot);

  const getIsBookmarked = useCallback(
    (id: number, initialIsBookmarked = false) =>
      bookmarks.get(id) ?? initialIsBookmarked,
    [bookmarks],
  );

  return { getIsBookmarked, setBookmark };
};
