import type { Meta, StoryObj } from '@storybook/react-vite';

import StateMessage from '@/shared/components/state-message/state-message';

const meta = {
  title: 'Shared/StateMessage',
  component: StateMessage,
  parameters: { layout: 'centered' },
  args: {
    kind: 'empty',
    scope: 'inline',
    title: '검색 결과가 없습니다',
    description: '검색어나 필터 조건을 조정해 주세요',
    action: { label: '필터 초기화', onClick: () => {} },
  },
  argTypes: {
    kind: { control: 'select', options: ['empty', 'error', 'offline'] },
    scope: { control: 'radio', options: ['inline', 'section'] },
    action: { control: false },
  },
} satisfies Meta<typeof StateMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const EmptyInline: Story = {};
export const ErrorInline: Story = {
  args: {
    kind: 'error',
    title: '정보를 불러오지 못했습니다',
    description: '입력값은 유지됩니다. 잠시 후 다시 시도해 주세요',
    action: { label: '다시 시도', onClick: () => {} },
  },
};
export const OfflineInline: Story = {
  args: {
    kind: 'offline',
    title: '네트워크 연결을 확인해 주세요',
    description: '연결되면 현재 상태에서 다시 불러올 수 있습니다',
    action: { label: '연결 재시도', onClick: () => {} },
  },
};
export const EmptySection: Story = { args: { scope: 'section' } };
export const ErrorSection: Story = {
  args: { ...ErrorInline.args, scope: 'section' },
};
export const OfflineSection: Story = {
  args: { ...OfflineInline.args, scope: 'section' },
};
