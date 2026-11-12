// [스토리] SkeletonFilterPanel
// 위치 : Shared/Skeleton/SkeletonFilterPanel
// 상태 : Default 하나 (바꿀 props가 없음)

import type { Meta, StoryObj } from '@storybook/react-vite';

import SkeletonFilterPanel from './skeleton-filter-panel';

const meta = {
  title: 'Shared/Skeleton/SkeletonFilterPanel',
  component: SkeletonFilterPanel,
} satisfies Meta<typeof SkeletonFilterPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
