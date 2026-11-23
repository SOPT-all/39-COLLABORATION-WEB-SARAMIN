import { useSyncExternalStore } from 'react';

// 헤더 검색창의 최근 검색어예요. 브라우저 localStorage에 남겨 새로고침 · 다른 탭에서도 유지돼요.
const STORAGE_KEY = 'saramin:recent-searches';
// 피그마 panel_search_suggestion의 최근 검색어 줄 수
const MAX_RECENT_SEARCHES = 4;

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string');

const readStoredSearches = (): string[] => {
  try {
    const stored: unknown = JSON.parse(
      window.localStorage.getItem(STORAGE_KEY) ?? '[]',
    );
    return isStringArray(stored) ? stored.slice(0, MAX_RECENT_SEARCHES) : [];
  } catch {
    // 시크릿 모드 · 깨진 값이면 빈 목록으로 시작해요.
    return [];
  }
};

let recentSearches = readStoredSearches();
const listeners = new Set<() => void>();

const update = (nextSearches: string[]) => {
  recentSearches = nextSearches;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSearches));
  } catch {
    // 저장에 실패해도 이번 방문 동안은 메모리로 동작해요.
  }
  listeners.forEach((listener) => listener());
};

// 다른 탭에서 검색하면 이 탭의 최근 검색어도 바꿔요.
const handleStorage = (e: StorageEvent) => {
  if (e.key !== STORAGE_KEY) return;
  recentSearches = readStoredSearches();
  listeners.forEach((listener) => listener());
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

const getSnapshot = () => recentSearches;

// 같은 검색어는 맨 앞으로 옮기고, 최대 개수를 넘으면 오래된 것부터 빼요.
const addRecentSearch = (keyword: string) =>
  update(
    [keyword, ...recentSearches.filter((search) => search !== keyword)].slice(
      0,
      MAX_RECENT_SEARCHES,
    ),
  );

const removeRecentSearch = (keyword: string) =>
  update(recentSearches.filter((search) => search !== keyword));

export const useRecentSearches = () => {
  const searches = useSyncExternalStore(subscribe, getSnapshot);
  return { recentSearches: searches, addRecentSearch, removeRecentSearch };
};
