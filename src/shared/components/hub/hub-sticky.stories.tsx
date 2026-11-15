// [스토리] HubSticky
// 위치 : Shared/Hub/HubSticky
// 상태 : status 4개 × size 2개 중 피그마에 있는 5개 + 한 줄에 늘어놓은 AllStates

import type { Meta, StoryObj } from '@storybook/react-vite';

import HubSticky from './hub-sticky';

const meta = {
  title: 'Shared/Hub/HubSticky',
  component: HubSticky,
  args: { status: 'ready', size: 'full' },
  argTypes: {
    status: {
      control: 'select',
      options: ['ready', 'dragging', 'needsDocument', 'loading'],
    },
    size: { control: 'select', options: ['full', 'compact'] },
  },
} satisfies Meta<typeof HubSticky>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Ready: Story = {};
export const Dragging: Story = { args: { status: 'dragging' } };
export const NeedsDocument: Story = {
  args: {
    status: 'needsDocument',
    documents: [
      { label: '이력서', count: 1 },
      { label: '자기소개서', count: 1 },
      { label: '경력기술서', state: 'required' },
    ],
  },
};
export const Compact: Story = { args: { size: 'compact' } };
export const Loading: Story = { args: { status: 'loading' } };

export const AllStates: Story = {
  render: () => (
    <div className="flex items-start gap-6 bg-surface-subtle p-6">
      <HubSticky status="ready" />
      <HubSticky status="dragging" />
      <HubSticky
        status="needsDocument"
        documents={[
          { label: '이력서', count: 1 },
          { label: '자기소개서', count: 1 },
          { label: '경력기술서', state: 'required' },
        ]}
      />
      <HubSticky size="compact" />
      <HubSticky status="loading" />
    </div>
  ),
};
