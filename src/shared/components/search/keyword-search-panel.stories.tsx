// [스토리] KeywordSearchPanel
// 상태 : search · compare-background · loading

import type { Meta, StoryObj } from '@storybook/react-vite';

import KeywordSearchPanel from './keyword-search-panel';

const meta = {
  title: 'Shared/Search/KeywordSearchPanel',
  component: KeywordSearchPanel,
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
  args: {
    context: 'search',
    state: 'loaded',
    onRemove: () => {},
    onSearch: () => {},
  },
  argTypes: {
    context: {
      control: 'radio',
      options: ['search', 'compare-background'],
    },
    state: { control: 'radio', options: ['loaded', 'loading'] },
  },
} satisfies Meta<typeof KeywordSearchPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Search: Story = {};

export const CompareBackground: Story = {
  args: { context: 'compare-background' },
};

export const Loading: Story = {
  args: { state: 'loading' },
};
