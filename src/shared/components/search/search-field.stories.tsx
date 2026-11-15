// [스토리] SearchField
// 상태 : default · focused · typing · loading · error · disabled

import type { Meta, StoryObj } from '@storybook/react-vite';

import SearchField from './search-field';

const STATES = [
  'default',
  'focused',
  'typing',
  'loading',
  'error',
  'disabled',
] as const;

const meta = {
  title: 'Shared/Search/SearchField',
  component: SearchField,
  decorators: [
    (Story) => (
      <div className="w-120">
        <Story />
      </div>
    ),
  ],
  args: {
    state: 'default',
  },
  argTypes: {
    state: { control: 'select', options: STATES },
  },
} satisfies Meta<typeof SearchField>;

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
  args: { state: 'error', query: '프로덕트 디자이너입니다' },
};

export const Disabled: Story = {
  args: { state: 'disabled' },
};
