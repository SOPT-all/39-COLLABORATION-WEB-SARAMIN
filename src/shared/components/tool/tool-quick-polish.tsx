// [스펙] ToolQuickPolish
// 역할   : 홈 "취업 준비, 한 번에 끝내기"의 도구 아이템. 120px 원 안에 아이콘 + 두 줄 라벨. 컴포넌트 1개가 도구 9종을 표현
// props  : tool - 도구 9종 중 하나. 아이콘 · 라벨은 tool-quick-polish-tools.ts 표에서 꺼냄
//          className, 나머지 button 속성 통과 (onClick · 이동은 페이지에서 연결)
// 상태   : Default · Hover 2개. Hover는 props가 아니라 CSS hover:로 처리 (마우스 올리면 저절로 바뀌므로)
//          Hover 때 배경 흰색 · 테두리 · 그림자 · 라벨 파랑. 아이콘은 그대로
// 구조   : [아이콘 영역 62px: 28px 아이콘] [라벨 영역 58px: 14 Medium 두 줄]
// 접근성 : button + type="button". 라벨이 그대로 읽히므로 aria-label 없음. 아이콘만 aria-hidden

import type { ComponentProps } from 'react';

import {
  TOOL_QUICK_POLISH_ITEMS,
  type ToolQuickPolishKey,
} from '@/shared/components/tool/tool-quick-polish-tools';
import { cn } from '@/shared/utils/cn';

interface ToolQuickPolishProps extends ComponentProps<'button'> {
  tool: ToolQuickPolishKey;
}

const ToolQuickPolish = ({
  tool,
  className,
  ...props
}: ToolQuickPolishProps) => {
  const { icon: Icon, label } = TOOL_QUICK_POLISH_ITEMS[tool];

  return (
    <button
      type="button"
      className={cn(
        'flex size-30 shrink-0 flex-col items-center rounded-full border border-transparent bg-surface-subtle text-text-primary transition-colors',
        'hover:border-border-default hover:bg-surface-default hover:text-blue-90 hover:shadow-card',
        className,
      )}
      {...props}
    >
      <span className="flex h-15.5 items-center justify-center">
        <Icon aria-hidden className="shrink-0" />
      </span>
      <span className="h-14.5 text-center text-label-14 whitespace-pre-line">
        {label}
      </span>
    </button>
  );
};

export default ToolQuickPolish;
