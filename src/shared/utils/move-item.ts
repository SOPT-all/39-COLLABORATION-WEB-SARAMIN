// 배열에서 from 위치의 항목을 to 위치로 옮긴 새 배열을 돌려줘요. 범위를 벗어나면 그대로 돌려줘요.
export const moveItem = <T>(items: T[], from: number, to: number) => {
  if (
    from === to ||
    from < 0 ||
    to < 0 ||
    from >= items.length ||
    to >= items.length
  ) {
    return items;
  }
  const next = [...items];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
};
