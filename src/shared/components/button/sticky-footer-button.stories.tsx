// [스토리] StickyFooterButton
// 위치 : Shared/Button/StickyFooterButton
// 상태 : 단독 + 허브처럼 2개를 구분선으로 나란히 둔 Pair

import type { Meta, StoryObj } from '@storybook/react-vite';

import StickyFooterButton from './sticky-footer-button';

const meta = {
  title: 'Shared/Button/StickyFooterButton',
  component: StickyFooterButton,
  args: { children: '서류 관리' },
  decorators: [
    (Story) => (
      <div className="w-69 rounded-[22px] bg-blue-90 p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StickyFooterButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Pair: Story = {
  render: () => (
    <div className="flex h-11 items-center">
      <StickyFooterButton>서류 관리</StickyFooterButton>
      <span aria-hidden className="h-4 w-px bg-white" />
      <StickyFooterButton>지원 내역</StickyFooterButton>
    </div>
  ),
};
