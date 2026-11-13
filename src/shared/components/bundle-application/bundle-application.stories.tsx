import type { Meta, StoryObj } from '@storybook/react-vite';

import BundleApplication from '@/shared/components/bundle-application/bundle-application';

// 지원 패키지 묶음의 기본, 드래그 중, 비활성화, 로딩 상태 확인
// 로딩 상태는 실제 스켈레톤 연결 전까지 Storybook 전용 임시 UI 사용

const LOADING_EXAMPLE = (
  <div aria-hidden className="flex h-full w-full items-center gap-3">
    <div className="h-10 w-8 shrink-0 rounded-lg bg-surface-subtle" />
    <div className="flex min-w-0 flex-1 flex-col justify-center gap-2">
      <div className="h-3 w-28 rounded-md bg-surface-subtle" />
      <div className="h-2 w-21 rounded-md bg-surface-subtle" />
    </div>
    <div className="h-10 w-6 shrink-0 rounded-lg bg-surface-subtle" />
  </div>
);

const meta = {
  title: 'Shared/BundleApplication',
  component: BundleApplication,
  tags: ['autodocs'],
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

export const Grabbed: Story = {
  args: { state: 'grabbed' },
};

export const Disabled: Story = {
  args: { state: 'disabled' },
};

export const Loading: Story = {
  args: {
    state: 'loading',
    loadingSlot: LOADING_EXAMPLE,
  },
};

// 네 가지 상태를 한 화면에서 비교
export const AllStates: Story = {
  render: (args) => (
    <div className="grid grid-cols-2 gap-6 p-5">
      {(['default', 'grabbed', 'disabled', 'loading'] as const).map((state) => (
        <div key={state} className="flex flex-col gap-2">
          <p className="text-label-14 text-text-secondary">{state}</p>
          <BundleApplication
            {...args}
            state={state}
            loadingSlot={state === 'loading' ? LOADING_EXAMPLE : undefined}
          />
        </div>
      ))}
    </div>
  ),
};
