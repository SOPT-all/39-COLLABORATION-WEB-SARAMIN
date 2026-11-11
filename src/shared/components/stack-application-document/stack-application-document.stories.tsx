import type { Meta, StoryObj } from '@storybook/react-vite';

import StackApplicationDocument from '@/shared/components/stack-application-document/stack-application-document';

const meta = {
  title: 'Shared/StackApplicationDocument',
  component: StackApplicationDocument,
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

export const Default: Story = {};
export const Grabbed: Story = { args: { state: 'grabbed' } };
export const Disabled: Story = { args: { state: 'disabled' } };
