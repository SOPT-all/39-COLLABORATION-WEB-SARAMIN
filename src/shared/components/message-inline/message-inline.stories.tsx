import type { Meta, StoryObj } from '@storybook/react-vite';

import MessageInline from '@/shared/components/message-inline/message-inline';

const meta = {
  title: 'Shared/MessageInline',
  component: MessageInline,
  parameters: { layout: 'centered' },
  args: {
    tone: 'info',
    message: '기존 결과를 유지한 채 새로고침 중입니다',
  },
  argTypes: {
    tone: { control: 'select', options: ['info', 'error', 'success'] },
    action: { control: false },
  },
} satisfies Meta<typeof MessageInline>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Info: Story = {};
export const Error: Story = {
  args: {
    tone: 'error',
    message: '일부 정보를 불러오지 못했습니다',
    action: { label: '다시 시도', onClick: () => {} },
  },
};
export const Success: Story = {
  args: {
    tone: 'success',
    message: '변경사항이 저장되었습니다',
  },
};
