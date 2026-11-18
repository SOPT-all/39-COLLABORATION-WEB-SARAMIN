import type { Meta, StoryObj } from '@storybook/react-vite';

import SearchSummary from './search-summary';

const meta = {
  title: 'Pages/Search/SearchSummary',
  component: SearchSummary,
  args: {
    keyword: '개발자',
    totalCount: 1234,
    isLoading: false,
    isError: false,
  },
} satisfies Meta<typeof SearchSummary>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Loaded: Story = {};

// 정상적인 빈 결과에서는 검색 요약과 0건을 함께 표시해요.
export const Empty: Story = {
  args: { totalCount: 0 },
};

// 이전 건수가 있어도 로딩·오류 중에는 검색완료 문구를 숨겨요.
export const Loading: Story = {
  args: { isLoading: true },
};

export const Error: Story = {
  args: { isError: true },
};
