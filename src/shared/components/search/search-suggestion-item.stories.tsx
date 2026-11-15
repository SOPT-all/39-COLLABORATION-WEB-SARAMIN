// [스토리] SearchSuggestionItem
// 상태 : default · hover · pressed · focused · disabled

import type { Meta, StoryObj } from '@storybook/react-vite';

import SearchSuggestionItem from './search-suggestion-item';

const STATES = ['default', 'hover', 'pressed', 'focused', 'disabled'] as const;

const meta = {
  title: 'Shared/Search/SearchSuggestionItem',
  component: SearchSuggestionItem,
  decorators: [
    (Story) => (
      <div className="w-120">
        <Story />
      </div>
    ),
  ],
  args: {
    keyword: '프로덕트 디자이너',
    supportingText: '최근 검색',
    state: 'default',
    onRemove: () => {},
  },
  argTypes: {
    state: { control: 'select', options: STATES },
  },
} satisfies Meta<typeof SearchSuggestionItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Hover: Story = {
  args: { state: 'hover' },
};

export const Pressed: Story = {
  args: { state: 'pressed' },
};

export const Focused: Story = {
  args: { state: 'focused' },
};

export const Disabled: Story = {
  args: { state: 'disabled' },
};

export const AllStates: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      {STATES.map((state) => (
        <SearchSuggestionItem key={state} {...args} state={state} />
      ))}
    </div>
  ),
};
