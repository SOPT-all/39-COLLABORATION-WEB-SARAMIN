// [스토리] RowSearchResult
// 상태 : loaded · loading

import type { Meta, StoryObj } from '@storybook/react-vite';

import RowSearchResult from './row-search-result';

const meta = {
  title: 'Shared/Row/RowSearchResult',
  component: RowSearchResult,
  decorators: [
    (Story) => (
      <div className="w-200">
        <Story />
      </div>
    ),
  ],
  args: {
    contentState: 'loaded',
    onBookmarkClick: () => {},
  },
  argTypes: {
    contentState: { control: 'radio', options: ['loaded', 'loading'] },
  },
} satisfies Meta<typeof RowSearchResult>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Loaded: Story = {};

export const Bookmarked: Story = {
  args: { isBookmarked: true },
};

export const Loading: Story = {
  args: { contentState: 'loading' },
};
