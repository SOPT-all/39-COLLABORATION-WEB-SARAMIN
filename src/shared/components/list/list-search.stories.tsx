// [스토리] ListSearch
// 상태 : Default

import type { Meta, StoryObj } from '@storybook/react-vite';

import ListSearch from './list-search';

const meta = {
  title: 'Shared/List/ListSearch',
  component: ListSearch,
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  args: {
    onSelect: () => {},
  },
} satisfies Meta<typeof ListSearch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
