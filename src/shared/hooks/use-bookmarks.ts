import { useCallback, useMemo, useSyncExternalStore } from 'react';

import type { CompareJob } from '@/shared/types/compare-job';
import { convertDeadlineToDday } from '@/shared/utils/convert-deadline-to-dday';

// 북마크(스크랩) API가 없어서 브라우저 localStorage에 저장해요. 새로고침 · 다른 탭에서도 유지돼요.
// 홈 · 검색 · 비교 모달이 같은 상태를 써서 어디서 바꿔도 함께 바뀌어요. (기능명세서 FR-10)
interface BookmarkState {
  bookmarkById: ReadonlyMap<number, boolean>;
  // 스크랩한 공고의 비교용 정보. 스크랩한 순서대로 비교 모달에 보여 줘요.
  compareJobById: ReadonlyMap<number, CompareJob>;
}

// 저장 형식이 바뀌면 버전을 올려요. 다른 버전의 값은 버리고 새로 시작해요.
const STORAGE_KEY = 'saramin:bookmarks';
const STORAGE_VERSION = 1;

interface StoredBookmarks {
  version: number;
  bookmarks: [number, boolean][];
  compareJobs: CompareJob[];
}

const EMPTY_STATE: BookmarkState = {
  bookmarkById: new Map(),
  compareJobById: new Map(),
};

const isStoredBookmarks = (value: unknown): value is StoredBookmarks => {
  if (typeof value !== 'object' || value === null) return false;
  const { version, bookmarks, compareJobs } = value as Partial<StoredBookmarks>;
  return (
    version === STORAGE_VERSION &&
    Array.isArray(bookmarks) &&
    Array.isArray(compareJobs)
  );
};

// 저장된 마감 표시(D-3)는 날이 지나면 틀려서, 불러올 때 마감 일시 원문으로 다시 계산해요.
const refreshDeadline = (job: CompareJob): CompareJob => ({
  ...job,
  deadline: convertDeadlineToDday(job.deadlineAt),
});

const readStoredState = (): BookmarkState => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_STATE;
    const stored: unknown = JSON.parse(raw);
    if (!isStoredBookmarks(stored)) return EMPTY_STATE;

    return {
      bookmarkById: new Map(stored.bookmarks),
      compareJobById: new Map(
        stored.compareJobs.map((job) => [job.id, refreshDeadline(job)]),
      ),
    };
  } catch {
    // 시크릿 모드 · 깨진 값이면 빈 상태로 시작해요.
    return EMPTY_STATE;
  }
};

const writeStoredState = ({ bookmarkById, compareJobById }: BookmarkState) => {
  try {
    const stored: StoredBookmarks = {
      version: STORAGE_VERSION,
      bookmarks: [...bookmarkById],
      compareJobs: [...compareJobById.values()],
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // 저장에 실패해도(용량 초과 · 시크릿 모드) 이번 방문 동안은 메모리로 동작해요.
  }
};

let state: BookmarkState = readStoredState();
const listeners = new Set<() => void>();

const notify = () => listeners.forEach((listener) => listener());

// 다른 탭에서 스크랩을 바꾸면 이 탭에도 바로 반영해요.
const handleStorage = (e: StorageEvent) => {
  if (e.key !== STORAGE_KEY) return;
  state = readStoredState();
  notify();
};

const subscribe = (listener: () => void) => {
  if (listeners.size === 0) window.addEventListener('storage', handleStorage);
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener('storage', handleStorage);
    }
  };
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
  writeStoredState(state);
  notify();
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
