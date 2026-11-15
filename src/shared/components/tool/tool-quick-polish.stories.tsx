// [스토리] ToolQuickPolish
// 위치 : Shared/Tool/ToolQuickPolish
// 상태 : tool 9종 select + 9개를 피그마처럼 한 줄에 늘어놓은 AllTools. Hover는 마우스를 올려서 확인

import type { Meta, StoryObj } from '@storybook/react-vite';

import ToolQuickPolish from './tool-quick-polish';
import { TOOL_QUICK_POLISH_KEYS } from './tool-quick-polish-tools';

const meta = {
  title: 'Shared/Tool/ToolQuickPolish',
  component: ToolQuickPolish,
  tags: ['autodocs'],
  args: { tool: 'textCount' },
  argTypes: {
    tool: { control: 'select', options: TOOL_QUICK_POLISH_KEYS },
  },
} satisfies Meta<typeof ToolQuickPolish>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllTools: Story = {
  render: () => (
    <div className="flex flex-wrap gap-5 bg-surface-default p-6">
      {TOOL_QUICK_POLISH_KEYS.map((tool) => (
        <ToolQuickPolish key={tool} tool={tool} />
      ))}
    </div>
  ),
};
