import { useEffect, useState } from 'react';

// flag가 delayMs 넘게 true일 때만 true를 돌려줘요.
// 짧은 재조회처럼 금방 끝나는 상태에는 표시를 띄우지 않아 화면이 깜빡이지 않아요.
export const useDelayedFlag = (flag: boolean, delayMs: number) => {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    if (!flag) return;
    const timer = setTimeout(() => setIsShown(true), delayMs);
    return () => {
      clearTimeout(timer);
      setIsShown(false);
    };
  }, [flag, delayMs]);

  return flag && isShown;
};
