// [스토리] SkeletonStickyHub
// 위치 : Shared/Skeleton/SkeletonStickyHub
// 상태 : Default 하나 (바꿀 props가 없음)

import type { Meta, StoryObj } from '@storybook/react-vite';

import SkeletonStickyHub from './skeleton-sticky-hub';

const meta = {
  title: 'Shared/Skeleton/SkeletonStickyHub',
  component: SkeletonStickyHub,
} satisfies Meta<typeof SkeletonStickyHub>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
