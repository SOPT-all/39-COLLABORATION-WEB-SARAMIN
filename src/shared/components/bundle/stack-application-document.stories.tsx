// [스토리] StackApplicationDocument
// 위치 : Shared/Bundle/StackApplicationDocument
// 상태 : default · grabbed · disabled

import type { Meta, StoryObj } from '@storybook/react-vite';

import StackApplicationDocument from './stack-application-document';

const meta = {
  title: 'Shared/Bundle/StackApplicationDocument',
  component: StackApplicationDocument,
  args: { state: 'default' },
  argTypes: {
    state: { control: 'select', options: ['default', 'grabbed', 'disabled'] },
  },
} satisfies Meta<typeof StackApplicationDocument>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Grabbed: Story = { args: { state: 'grabbed' } };
export const Disabled: Story = { args: { state: 'disabled' } };
