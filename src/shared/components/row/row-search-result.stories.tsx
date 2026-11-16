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
    matchCount: 2,
    deadline: 'D-4',
    matchedKeywords: 'Figma · 프로토타이핑',
    title: '[첫차]와 함께 할 프로덕트 디자이너를 찾습니다.',
    meta: '서울 강남구 · 신입·경력 · 학력무관 · 정규직',
    companyName: '(주)미스터픽',
    companyMeta: '관심기업 TOP 100',
    isBookmarked: false,
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
