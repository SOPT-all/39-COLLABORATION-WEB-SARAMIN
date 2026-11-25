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
    state: 'loaded',
    keywords: [
      'Figma',
      'UX디자인',
      'Adobe XD',
      'UI',
      '프로덕트 디자인',
      'UX',
      '프로토타이핑',
    ],
    onRemove: () => {},
  },
  argTypes: {
    state: { control: 'radio', options: ['loaded', 'loading'] },
  },
} satisfies Meta<typeof KeywordSearchPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Search: Story = {};

export const CompareBackground: Story = {
  args: {
    keywords: [
      'Figma',
      'Sketch',
      'Zeplin',
      'Framer',
      'ProtoPie',
      'Adobe XD',
      'Principle',
    ],
  },
};

export const Loading: Story = {
  args: { state: 'loading' },
};
