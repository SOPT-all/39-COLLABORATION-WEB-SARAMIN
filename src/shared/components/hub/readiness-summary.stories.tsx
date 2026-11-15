// [스토리] ReadinessSummary
// 위치 : Shared/Hub/ReadinessSummary
// 상태 : tone ready · warning

import type { Meta, StoryObj } from '@storybook/react-vite';

import ReadinessSummary from './readiness-summary';

const meta = {
  title: 'Shared/Hub/ReadinessSummary',
  component: ReadinessSummary,
  args: { tone: 'ready' },
  argTypes: {
    tone: { control: 'select', options: ['ready', 'warning'] },
  },
  decorators: [
    (Story) => (
      <div className="w-69 rounded-[22px] bg-blue-90 p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ReadinessSummary>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Ready: Story = {};
export const Warning: Story = {
  args: {
    tone: 'warning',
    title: '필수 서류 2/3 준비',
    description: '경력기술서 보완 필요',
  },
};
