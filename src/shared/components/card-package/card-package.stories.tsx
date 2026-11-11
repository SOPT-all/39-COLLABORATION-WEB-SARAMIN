import type { Meta, StoryObj } from '@storybook/react-vite';

import CardPackage from '@/shared/components/card-package/card-package';

const meta = {
  title: 'Shared/CardPackage',
  component: CardPackage,
  parameters: { layout: 'centered' },
  args: {
    title: '기본 지원 패키지',
    documentSummary: '이력서 1 · 자기소개서 1 · 경력기술서 1',
    updatedLabel: '최근 업데이트 10분 전',
    state: 'default',
  },
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'selected', 'incomplete', 'ready'],
    },
  },
} satisfies Meta<typeof CardPackage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Selected: Story = { args: { state: 'selected' } };
export const Incomplete: Story = { args: { state: 'incomplete' } };
export const Ready: Story = { args: { state: 'ready' } };
