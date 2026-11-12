// [스토리] SkeletonApplicationBundle
// 위치 : Shared/Skeleton/SkeletonApplicationBundle
// 상태 : Default 하나 (바꿀 props가 없음)

import type { Meta, StoryObj } from '@storybook/react-vite';

import SkeletonApplicationBundle from './skeleton-application-bundle';

const meta = {
  title: 'Shared/Skeleton/SkeletonApplicationBundle',
  component: SkeletonApplicationBundle,
} satisfies Meta<typeof SkeletonApplicationBundle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
