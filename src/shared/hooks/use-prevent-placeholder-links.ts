import { useEffect } from 'react';

const PLACEHOLDER_LINK_SELECTOR = 'a[href="#"]';

// 아직 이동할 곳이 없는 자리 표시 링크(href="#")를 눌러도 화면이 맨 위로 튀거나 주소에 #이 붙지 않게 해요.
// 헤더 메뉴 · 푸터 · 검색 화면 곳곳에 있어서 레이아웃에서 한 번만 걸어요.
export const usePreventPlaceholderLinks = () => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return;
      if (e.target.closest(PLACEHOLDER_LINK_SELECTOR)) e.preventDefault();
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
};
