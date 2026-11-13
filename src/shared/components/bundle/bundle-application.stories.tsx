// [스토리] BundleApplication
// 위치 : Shared/Bundle/BundleApplication
// 상태 : default · grabbed · disabled + 셋을 나란히 둔 AllStates

import type { Meta, StoryObj } from '@storybook/react-vite';

import BundleApplication from './bundle-application';

const STATES = ['default', 'grabbed', 'disabled'] as const;

const meta = {
  title: 'Shared/Bundle/BundleApplication',
  component: BundleApplication,
  args: { state: 'default' },
  argTypes: {
    state: { control: 'select', options: STATES },
  },
} satisfies Meta<typeof BundleApplication>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Grabbed: Story = { args: { state: 'grabbed' } };
export const Disabled: Story = { args: { state: 'disabled' } };

export const AllStates: Story = {
  render: () => (
    <div className="flex w-69 flex-col gap-4 rounded-[22px] bg-blue-90 p-4">
      {STATES.map((state) => (
        <BundleApplication key={state} state={state} />
      ))}
    </div>
  ),
};
