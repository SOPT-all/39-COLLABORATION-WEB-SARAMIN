// [스토리] SearchSuggestionPanel
// 상태 : recent · predictive · related · loading · empty · error

import type { Meta, StoryObj } from '@storybook/react-vite';

import SearchSuggestionPanel from './search-suggestion-panel';

const CONTENT_STATES = [
  'recent',
  'predictive',
  'related',
  'loading',
  'empty',
  'error',
] as const;

const meta = {
  title: 'Shared/Search/SearchSuggestionPanel',
  component: SearchSuggestionPanel,
  decorators: [
    (Story) => (
      <div className="w-120">
        <Story />
      </div>
    ),
  ],
  args: {
    contentState: 'recent',
    onSelect: () => {},
    onRemove: () => {},
    onResetFilter: () => {},
    onRetry: () => {},
  },
  argTypes: {
    contentState: { control: 'select', options: CONTENT_STATES },
  },
} satisfies Meta<typeof SearchSuggestionPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Recent: Story = {};

export const Predictive: Story = {
  args: { contentState: 'predictive' },
};

export const Related: Story = {
  args: { contentState: 'related' },
};

export const Loading: Story = {
  args: { contentState: 'loading' },
};

export const Empty: Story = {
  args: { contentState: 'empty' },
};

export const Error: Story = {
  args: { contentState: 'error' },
};
