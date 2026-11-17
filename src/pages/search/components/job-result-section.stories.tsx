import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';

import {
  MOCK_SEARCH_RESULT_TOTAL,
  MOCK_SEARCH_RESULTS,
} from '@/pages/search/constants/mock-search';

import JobResultSection from './job-result-section';

const meta = {
  title: 'Pages/Search/JobResultSection',
  component: JobResultSection,
  decorators: [
    (Story) => (
      <div className="w-238">
        <Story />
      </div>
    ),
  ],
  args: {
    results: MOCK_SEARCH_RESULTS,
    totalCount: MOCK_SEARCH_RESULT_TOTAL,
    keywordCount: 3,
    currentPage: 0,
    totalPages: 19,
    onPageChange: () => {},
    isLoading: false,
    isError: false,
  },
  render: (args) => {
    const [, updateArgs] = useArgs();

    // 실제 API 호출 없이 선택 번호와 이전·다음 버튼 상태를 확인해요.
    // 공고 목록은 페이지가 바뀌어도 동일한 예시 데이터를 유지해요.
    const handlePageChange = (page: number) => {
      if (page < 0 || page >= args.totalPages || page === args.currentPage) {
        return;
      }
      args.onPageChange(page);
      updateArgs({ currentPage: page });
    };

    return <JobResultSection {...args} onPageChange={handlePageChange} />;
  },
} satisfies Meta<typeof JobResultSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Loaded: Story = {};

export const SinglePage: Story = {
  args: { totalPages: 1, totalCount: MOCK_SEARCH_RESULTS.length },
};

// 다음 클릭 시 11~19번 묶음으로 전환되고, 이전으로 다시 돌아갈 수 있어요.
export const PageGroupBoundary: Story = {
  args: { currentPage: 9 },
};

export const LastPage: Story = {
  args: { currentPage: 18 },
};

export const WithoutKeywords: Story = {
  args: {
    keywordCount: 0,
    results: MOCK_SEARCH_RESULTS.map((result) => ({
      ...result,
      matchCount: 0,
      matchedKeywords: '',
      companyMeta: '',
    })),
  },
};

export const Loading: Story = {
  args: { results: [], totalCount: 0, totalPages: 0, isLoading: true },
};

export const Empty: Story = {
  args: { results: [], totalCount: 0, totalPages: 0 },
};

export const Error: Story = {
  args: { isError: true },
  render: (args) => {
    const [, updateArgs] = useArgs();

    // 실제 요청 대신 오류 해제로 재시도 콜백 연결을 확인해요.
    const handleRetry = () => updateArgs({ isError: false });

    return <JobResultSection {...args} onRetry={handleRetry} />;
  },
};
