import type { Meta, StoryObj } from '@storybook/react-vite';

import StateCompareEdit from '@/shared/components/state-compare-edit/state-compare-edit';

const meta = {
  title: 'Shared/StateCompareEdit',
  component: StateCompareEdit,
  parameters: { layout: 'centered' },
  argTypes: {
    // Keep each state with its required props; Error supplies its retry callback.
    state: { control: false },
    onRetry: { action: 'retry' },
  },
} satisfies Meta<typeof StateCompareEdit>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { state: 'default' } };
export const Loading: Story = { args: { state: 'loading' } };
export const Error: Story = {
  args: { state: 'error', onRetry: () => {} },
};
export const Success: Story = { args: { state: 'success' } };
