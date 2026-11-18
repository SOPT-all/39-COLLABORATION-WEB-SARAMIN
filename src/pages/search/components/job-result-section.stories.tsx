import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';

import {
  MOCK_SEARCH_RESULT_TOTAL,
  MOCK_SEARCH_RESULTS,
} from '@/pages/search/constants/mock-search';

import JobResultSection from './job-result-section';

const changeStoryPage = (
  page: number,
  currentPage: number,
  totalPages: number,
  onPageChange: (page: number) => void,
  updateCurrentPage: (page: number) => void,
) => {
  if (page < 0 || page >= totalPages || page === currentPage) {
    return;
  }

  onPageChange(page);
  updateCurrentPage(page);
};

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
  // 예시 목록은 그대로 두고, 선택 번호와 이전·다음 상태만 바꿔요.
  render: (args) => {
    const [, updateArgs] = useArgs();

    return (
      <JobResultSection
        {...args}
        onPageChange={(page) =>
          changeStoryPage(
            page,
            args.currentPage,
            args.totalPages,
            args.onPageChange,
            (nextPage) => updateArgs({ currentPage: nextPage }),
          )
        }
      />
    );
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

// 이전 목록·배지·선택 페이지를 유지하고 페이지 이동은 막아요.
export const Refreshing: Story = {
  args: { isRefreshing: true, currentPage: 2 },
};

export const RefreshingEmpty: Story = {
  args: { isRefreshing: true, results: [], totalCount: 0, totalPages: 0 },
};

export const Empty: Story = {
  args: { results: [], totalCount: 0, totalPages: 0 },
};

// 다시 시도하면 오류를 해제해요. 그 뒤의 페이지 이동도 동작해야 해요.
export const Error: Story = {
  args: { isError: true },
  render: (args) => {
    const [, updateArgs] = useArgs();

    return (
      <JobResultSection
        {...args}
        onPageChange={(page) =>
          changeStoryPage(
            page,
            args.currentPage,
            args.totalPages,
            args.onPageChange,
            (nextPage) => updateArgs({ currentPage: nextPage }),
          )
        }
        onRetry={() => updateArgs({ isError: false })}
      />
    );
  },
};
