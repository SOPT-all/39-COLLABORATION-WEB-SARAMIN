// [스토리] RowStickyDocument
// 상태 : ready · required · waiting

import type { Meta, StoryObj } from '@storybook/react-vite';

import RowStickyDocument from './row-sticky-document';

const meta = {
  title: 'Shared/Row/RowStickyDocument',
  component: RowStickyDocument,
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  args: {
    label: '이력서',
    state: 'ready',
    count: 1,
  },
  argTypes: {
    state: { control: 'radio', options: ['ready', 'required', 'waiting'] },
  },
} satisfies Meta<typeof RowStickyDocument>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Ready: Story = {};

export const Required: Story = {
  args: { state: 'required', label: '포트폴리오' },
};

// hover 시 '눌러서 서류 검사' 말풍선 표시
export const Waiting: Story = {
  args: { state: 'waiting' },
  decorators: [
    (Story) => (
      <div className="pt-6">
        <Story />
      </div>
    ),
  ],
};
