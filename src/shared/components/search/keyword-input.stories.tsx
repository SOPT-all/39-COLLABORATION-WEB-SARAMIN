// [스토리] KeywordInput
// 상태 : default · focused · error · chip

import type { Meta, StoryObj } from '@storybook/react-vite';

import KeywordInput from './keyword-input';

const STATES = ['default', 'focused', 'error', 'chip'] as const;

const meta = {
  title: 'Shared/Search/KeywordInput',
  component: KeywordInput,
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
} satisfies Meta<typeof KeywordInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Focused: Story = {
  args: { state: 'focused' },
};

export const Error: Story = {
  args: { state: 'error' },
};

export const Chip: Story = {
  args: {
    state: 'chip',
    keywords: ['Figma', 'UX디자인', 'Adobe XD'],
    onRemove: () => {},
  },
};
