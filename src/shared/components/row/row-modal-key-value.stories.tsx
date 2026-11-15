// [스토리] RowModalKeyValue
// 상태 : Default

import type { Meta, StoryObj } from '@storybook/react-vite';

import RowModalKeyValue from './row-modal-key-value';

const meta = {
  title: 'Shared/Row/RowModalKeyValue',
  component: RowModalKeyValue,
  decorators: [
    (Story) => (
      <div className="w-120">
        <Story />
      </div>
    ),
  ],
  args: {
    label: '지원 직무',
    value: '프로덕트 디자이너',
  },
} satisfies Meta<typeof RowModalKeyValue>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
