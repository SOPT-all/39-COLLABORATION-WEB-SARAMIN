// [스토리] ListCompanyPosition
// 상태 : Default

import type { Meta, StoryObj } from '@storybook/react-vite';

import ListCompanyPosition from './list-company-position';

const meta = {
  title: 'Shared/List/ListCompanyPosition',
  component: ListCompanyPosition,
  decorators: [
    (Story) => (
      <div className="w-200">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ListCompanyPosition>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
