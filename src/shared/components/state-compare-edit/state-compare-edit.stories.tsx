import type { Meta, StoryObj } from '@storybook/react-vite';

import StateCompareEdit from '@/shared/components/state-compare-edit/state-compare-edit';

const meta = {
  title: 'Shared/StateCompareEdit',
  component: StateCompareEdit,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    // error 상태에서 onRetry가 필수이므로 상태 변경은 개별 Story에서 확인
    state: { control: false },
    onRetry: { action: 'retry' },
  },
} satisfies Meta<typeof StateCompareEdit>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { state: 'default' },
};

export const Loading: Story = {
  args: { state: 'loading' },
};

export const Error: Story = {
  args: {
    state: 'error',
    onRetry: () => {},
  },
};

export const Success: Story = {
  args: { state: 'success' },
};

// 4가지 저장 상태를 한 화면에서 비교
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-3 p-5">
      <StateCompareEdit state="default" />
      <StateCompareEdit state="loading" />
      <StateCompareEdit state="error" onRetry={() => {}} />
      <StateCompareEdit state="success" />
    </div>
  ),
};
