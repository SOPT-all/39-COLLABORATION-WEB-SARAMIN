import type { Meta, StoryObj } from '@storybook/react-vite';

import BundleApplication from '@/shared/components/bundle-application/bundle-application';
import SkeletonApplicationBundle from '@/shared/components/skeleton/skeleton-application-bundle';

// 지원 패키지 묶음의 기본, 드래그 중, 비활성화, 로딩 상태 확인
// 재사용: 종현님 SkeletonApplicationBundle - 로딩 상태 UI

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

// 실제 공통 스켈레톤 컴포넌트 재사용
export const Loading: Story = {
  args: {
    state: 'loading',
    loadingSlot: <SkeletonApplicationBundle />,
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
            loadingSlot={
              state === 'loading' ? <SkeletonApplicationBundle /> : undefined
            }
          />
        </div>
      ))}
    </div>
  ),
};
