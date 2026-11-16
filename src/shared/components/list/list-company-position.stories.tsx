// [스토리] ListCompanyPosition
// 상태 : Default

import type { Meta, StoryObj } from '@storybook/react-vite';

import ListCompanyPosition from './list-company-position';

const meta = {
  title: 'Shared/List/ListCompanyPosition',
  component: ListCompanyPosition,
  decorators: [
    (Story) => (
      <div className="w-200">
        <Story />
      </div>
    ),
  ],
  args: {
    status: '채용중',
    title: '[콘텐츠유통팀] 판로개척 담당자',
    meta: '서울 서대문구 | 경력3년↑ | 대졸↑',
    deadline: '~11.01(일)',
    badge: '홈페이지 지원',
  },
} satisfies Meta<typeof ListCompanyPosition>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
