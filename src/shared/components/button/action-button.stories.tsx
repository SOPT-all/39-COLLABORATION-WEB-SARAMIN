// [스토리] ActionButton
// 상태 : Default · Disabled

import type { Meta, StoryObj } from '@storybook/react-vite';

import ActionButton from './action-button';

const meta = {
  title: 'Shared/Button/ActionButton',
  component: ActionButton,
  args: {
    children: '필터 초기화',
  },
} satisfies Meta<typeof ActionButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};
