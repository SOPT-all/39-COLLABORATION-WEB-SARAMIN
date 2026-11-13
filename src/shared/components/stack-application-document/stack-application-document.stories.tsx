import type { Meta, StoryObj } from '@storybook/react-vite';

import StackApplicationDocument from '@/shared/components/stack-application-document/stack-application-document';

// 지원 서류 아이콘의 기본, 드래그 중, 비활성화 상태를 확인

const meta = {
  title: 'Shared/StackApplicationDocument',
  component: StackApplicationDocument,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { state: 'default' },
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'grabbed', 'disabled'],
    },
  },
} satisfies Meta<typeof StackApplicationDocument>;

export default meta;

type Story = StoryObj<typeof meta>;

// 개별 상태 확인
export const Default: Story = {};

export const Grabbed: Story = {
  args: { state: 'grabbed' },
};

export const Disabled: Story = {
  args: { state: 'disabled' },
};

// 세 가지 상태를 한 화면에서 비교
export const AllStates: Story = {
  render: (args) => (
    <div className="flex items-center gap-8 p-5">
      {(['default', 'grabbed', 'disabled'] as const).map((state) => (
        <div key={state} className="flex flex-col items-center gap-3">
          <p className="text-label-14 text-text-secondary">{state}</p>
          <StackApplicationDocument {...args} state={state} />
        </div>
      ))}
    </div>
  ),
};
