import type { KeyboardEvent } from 'react';

// 검색창 아래 추천 목록을 ↑ ↓ 로 오가요. (헤더 추천 검색어 · MY FIT 키워드 후보)
// 키 이벤트를 받는 요소 안에 입력창 하나와 optionSelector에 맞는 버튼들이 있어야 해요.
// ↓ : 입력창 → 첫 항목 → 다음 항목 (마지막에서 멈춤)
// ↑ : 이전 항목 → 첫 항목에서 입력창으로
// 다룬 키면 true를 돌려줘요.
export const moveFocusByArrowKey = (
  e: KeyboardEvent<HTMLElement>,
  optionSelector: string,
) => {
  if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return false;

  const input = e.currentTarget.querySelector('input');
  const options = [
    ...e.currentTarget.querySelectorAll<HTMLElement>(optionSelector),
  ];
  if (!input || options.length === 0) return false;

  e.preventDefault();
  const index = options.findIndex(
    (option) => option === document.activeElement,
  );

  if (e.key === 'ArrowDown') {
    (options[index + 1] ?? options[options.length - 1]).focus();
    return true;
  }

  if (index <= 0) input.focus();
  else options[index - 1].focus();
  return true;
};
