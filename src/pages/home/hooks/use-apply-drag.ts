import { type ComponentProps, type DragEvent, useState } from 'react';

import { APPLY_BUNDLE_DRAG_TYPE } from '@/pages/home/constants/apply-drag';

// 스티키 허브의 지원 패키지를 끄는 동안의 상태예요.
// bundleProps는 HubSticky의 bundleProps로 그대로 넘겨요.
export const useApplyDrag = () => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: DragEvent<HTMLElement>) => {
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData(APPLY_BUNDLE_DRAG_TYPE, 'bundle');
    setIsDragging(true);
  };

  // 드롭하든 취소(ESC · 바깥에 놓기)하든 마지막에 항상 불려요.
  const handleDragEnd = () => setIsDragging(false);

  const bundleProps: ComponentProps<'section'> = {
    draggable: true,
    onDragStart: handleDragStart,
    onDragEnd: handleDragEnd,
  };

  return { isDragging, bundleProps };
};
