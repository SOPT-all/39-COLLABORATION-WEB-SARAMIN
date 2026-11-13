import type { Meta, StoryObj } from '@storybook/react-vite';

import CardPackage from '@/shared/components/card-package/card-package';

// 지원 패키지 카드의 기본, 선택, 서류 누락, 지원 가능 상태를 확인
// 재사용: BadgeModalStatus - CardPackage 내부에서 사용

const meta = {
  title: 'Shared/CardPackage',
  component: CardPackage,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    title: '기본 지원 패키지',
    documentSummary: '이력서 1 · 자기소개서 1 · 경력기술서 1',
    updatedLabel: '최근 업데이트 10분 전',
    state: 'default',
  },
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'selected', 'incomplete', 'ready'],
    },
  },
} satisfies Meta<typeof CardPackage>;

export default meta;

type Story = StoryObj<typeof meta>;

// 개별 상태 확인
export const Default: Story = {};

export const Selected: Story = {
  args: { state: 'selected' },
};

export const Incomplete: Story = {
  args: { state: 'incomplete' },
};

export const Ready: Story = {
  args: { state: 'ready' },
};

// 네 가지 상태를 한 화면에서 비교
export const AllStates: Story = {
  render: (args) => (
    <div className="grid grid-cols-2 gap-6 p-5">
      {(['default', 'selected', 'incomplete', 'ready'] as const).map(
        (state) => (
          <div key={state} className="flex flex-col gap-2">
            <p className="text-label-14 text-text-secondary">{state}</p>
            <CardPackage {...args} state={state} />
          </div>
        ),
      )}
    </div>
  ),
};
