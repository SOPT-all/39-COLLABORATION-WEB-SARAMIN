// [스토리] RowKeywordSearch
// 상태 : Default

import type { Meta, StoryObj } from '@storybook/react-vite';

import RowKeywordSearch from './row-keyword-search';

const meta = {
  title: 'Shared/Row/RowKeywordSearch',
  component: RowKeywordSearch,
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  args: {
    keyword: 'Figma',
  },
} satisfies Meta<typeof RowKeywordSearch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
