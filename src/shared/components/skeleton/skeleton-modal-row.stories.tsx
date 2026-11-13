// [스토리] SkeletonModalRow
// 위치 : Shared/Skeleton/SkeletonModalRow
// 상태 : Default 하나 (바꿀 props가 없음)

import type { Meta, StoryObj } from '@storybook/react-vite';

import SkeletonModalRow from './skeleton-modal-row';

const meta = {
  title: 'Shared/Skeleton/SkeletonModalRow',
  component: SkeletonModalRow,
} satisfies Meta<typeof SkeletonModalRow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
