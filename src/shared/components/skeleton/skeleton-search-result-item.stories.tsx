// [스토리] SkeletonSearchResultItem
// 위치 : Shared/Skeleton/SkeletonSearchResultItem
// 상태 : Default 하나 (바꿀 props가 없음)

import type { Meta, StoryObj } from '@storybook/react-vite';

import SkeletonSearchResultItem from './skeleton-search-result-item';

const meta = {
  title: 'Shared/Skeleton/SkeletonSearchResultItem',
  component: SkeletonSearchResultItem,
} satisfies Meta<typeof SkeletonSearchResultItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
