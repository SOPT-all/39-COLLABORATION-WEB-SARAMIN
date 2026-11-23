import { useEffect } from 'react';

const TITLE_SUFFIX = '사람인';

// 브라우저 탭 제목을 '제목 | 사람인'으로 바꿔요. 페이지를 떠나면 원래 제목(index.html)으로 돌려요.
// 홈은 index.html 제목을 그대로 써서 이 훅을 부르지 않아요.
export const useDocumentTitle = (title: string) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${title} | ${TITLE_SUFFIX}`;
    return () => {
      document.title = previousTitle;
    };
  }, [title]);
};
