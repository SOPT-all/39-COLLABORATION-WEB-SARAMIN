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
    isLoading: false,
    isError: false,
  },
} satisfies Meta<typeof JobResultSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Loaded: Story = {};

export const Loading: Story = {
  args: { results: [], totalCount: 0, isLoading: true },
};

export const Empty: Story = {
  args: { results: [], totalCount: 0 },
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
