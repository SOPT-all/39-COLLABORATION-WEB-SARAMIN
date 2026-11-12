// [스토리] SkeletonCompareColumn
// 위치 : Shared/Skeleton/SkeletonCompareColumn
// 상태 : Default 하나 (바꿀 props가 없음)

import type { Meta, StoryObj } from '@storybook/react-vite';

import SkeletonCompareColumn from './skeleton-compare-column';

const meta = {
  title: 'Shared/Skeleton/SkeletonCompareColumn',
  component: SkeletonCompareColumn,
} satisfies Meta<typeof SkeletonCompareColumn>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
