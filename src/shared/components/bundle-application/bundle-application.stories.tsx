import type { Meta, StoryObj } from '@storybook/react-vite';

import BundleApplication from '@/shared/components/bundle-application/bundle-application';

const meta = {
  title: 'Shared/BundleApplication',
  component: BundleApplication,
  parameters: { layout: 'centered' },
  args: {
    title: '지원 패키지',
    meta: '필수 서류 3개 · 최신',
    state: 'default',
  },
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'grabbed', 'disabled', 'loading'],
    },
    loadingSlot: { control: false },
  },
} satisfies Meta<typeof BundleApplication>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Grabbed: Story = { args: { state: 'grabbed' } };
export const Disabled: Story = { args: { state: 'disabled' } };
export const Loading: Story = {
  args: {
    state: 'loading',
    // Story-only example until the shared skeleton component is connected.
    loadingSlot: (
      <div aria-hidden className="flex h-full w-full items-center gap-3">
        <div className="h-10 w-8 shrink-0 rounded-lg bg-surface-subtle" />
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-2">
          <div className="h-3 w-28 rounded-md bg-surface-subtle" />
          <div className="h-2 w-21 rounded-md bg-surface-subtle" />
        </div>
        <div className="h-10 w-6 shrink-0 rounded-lg bg-surface-subtle" />
      </div>
    ),
  },
};
