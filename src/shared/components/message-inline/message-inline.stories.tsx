import type { Meta, StoryObj } from '@storybook/react-vite';

import MessageInline from '@/shared/components/message-inline/message-inline';

const meta = {
  title: 'Shared/MessageInline',
  component: MessageInline,
  tags: ['autodocs'],
} satisfies Meta<typeof MessageInline>;

export default meta;

type Story = StoryObj<typeof meta>;

// 안내 상태
export const Info: Story = {
  args: {
    tone: 'info',
    message: '기존 결과를 유지한 채 새로고침 중입니다',
  },
};

// 오류 상태
export const Error: Story = {
  args: {
    tone: 'error',
    message: '일부 정보를 불러오지 못했습니다',
    action: {
      label: '다시 시도',
      onClick: () => alert('다시 시도 클릭!'),
    },
  },
};

// 성공 상태
export const Success: Story = {
  args: {
    tone: 'success',
    message: '변경사항이 저장되었습니다',
  },
};

// 세 가지 상태를 한 화면에서 비교
export const AllStates: Story = {
  args: {
    message: '상태별 안내 메시지',
  },
  render: () => (
    <div className="flex flex-col gap-3 p-5">
      <MessageInline
        tone="info"
        message="기존 결과를 유지한 채 새로고침 중입니다"
      />

      <MessageInline
        tone="error"
        message="일부 정보를 불러오지 못했습니다"
        action={{
          label: '다시 시도',
          onClick: () => alert('다시 시도 클릭!'),
        }}
      />

      <MessageInline tone="success" message="변경사항이 저장되었습니다" />
    </div>
  ),
};
