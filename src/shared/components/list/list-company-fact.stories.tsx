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
} satisfies Meta<typeof ListCompanyFact>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
