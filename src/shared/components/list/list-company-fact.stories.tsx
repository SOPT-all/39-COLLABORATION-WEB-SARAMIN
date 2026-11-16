// [스토리] ListCompanyFact
// 상태 : Default

import type { Meta, StoryObj } from '@storybook/react-vite';

import ListCompanyFact from './list-company-fact';

const meta = {
  title: 'Shared/List/ListCompanyFact',
  component: ListCompanyFact,
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  args: {
    label: '설립일',
    value: '2013년 12월 17일 (업력 14년차)',
  },
} satisfies Meta<typeof ListCompanyFact>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
