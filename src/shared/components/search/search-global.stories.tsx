// [스토리] SearchGlobal
// 상태 : default · focused · typing · loading · error

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import SearchGlobal from './search-global';

const STATES = ['default', 'focused', 'typing', 'loading', 'error'] as const;

const meta = {
  title: 'Shared/Search/SearchGlobal',
  component: SearchGlobal,
  decorators: [
    (Story) => (
      <div className="w-160">
        <Story />
      </div>
    ),
  ],
  args: {
    state: 'default',
    placeholder: '프로덕트 디자이너',
    errorMessage: '일부 정보를 불러오지 못했습니다',
    onAiSearch: () => {},
    onRetry: () => {},
  },
  argTypes: {
    state: { control: 'select', options: STATES },
  },
} satisfies Meta<typeof SearchGlobal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Focused: Story = {
  args: { state: 'focused' },
};

export const Typing: Story = {
  args: { state: 'typing', query: '프로덕트 디자이너' },
};

export const Loading: Story = {
  args: { state: 'loading', query: '프로덕트 디자이너' },
};

export const Error: Story = {
  args: { state: 'error', query: '프로덕트 디자이너' },
};

const InteractiveSearchGlobal = () => {
  const [query, setQuery] = useState('');

  return (
    <SearchGlobal
      query={query}
      placeholder="프로덕트 디자이너"
      errorMessage="일부 정보를 불러오지 못했습니다"
      state={query.length > 0 ? 'typing' : 'default'}
      onQueryChange={setQuery}
    />
  );
};

export const Interactive: Story = {
  render: () => <InteractiveSearchGlobal />,
};
