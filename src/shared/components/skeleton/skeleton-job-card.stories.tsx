// [스토리] SkeletonJobCard
// 위치 : Shared/Skeleton/SkeletonJobCard
// 상태 : Default 하나 (바꿀 props가 없음)

import type { Meta, StoryObj } from '@storybook/react-vite';

import SkeletonJobCard from './skeleton-job-card';

const meta = {
  title: 'Shared/Skeleton/SkeletonJobCard',
  component: SkeletonJobCard,
} satisfies Meta<typeof SkeletonJobCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
