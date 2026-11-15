// [스토리] RowApplicationHistory
// 상태 : submitted · viewed · under_review · interview · rejected

import type { Meta, StoryObj } from '@storybook/react-vite';

import RowApplicationHistory from './row-application-history';

const STATUSES = [
  'submitted',
  'viewed',
  'under_review',
  'interview',
  'rejected',
] as const;

const STATUS_LABELS = {
  submitted: '지원 완료',
  viewed: '열람',
  under_review: '검토 중',
  interview: '면접',
  rejected: '불합격',
} as const;

const meta = {
  title: 'Shared/Row/RowApplicationHistory',
  component: RowApplicationHistory,
  decorators: [
    (Story) => (
      <div className="w-160">
        <Story />
      </div>
    ),
  ],
  args: {
    status: 'submitted',
    statusLabel: STATUS_LABELS.submitted,
  },
  argTypes: {
    status: { control: 'select', options: STATUSES },
  },
} satisfies Meta<typeof RowApplicationHistory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Submitted: Story = {};

export const Viewed: Story = {
  args: { status: 'viewed', statusLabel: STATUS_LABELS.viewed },
};

export const UnderReview: Story = {
  args: { status: 'under_review', statusLabel: STATUS_LABELS.under_review },
};

export const Interview: Story = {
  args: { status: 'interview', statusLabel: STATUS_LABELS.interview },
};

export const Rejected: Story = {
  args: { status: 'rejected', statusLabel: STATUS_LABELS.rejected },
};

export const AllStatuses: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      {STATUSES.map((status) => (
        <RowApplicationHistory
          key={status}
          {...args}
          status={status}
          statusLabel={STATUS_LABELS[status]}
        />
      ))}
    </div>
  ),
};
