// [스토리] SkeletonBlock
// 위치 : Shared/Skeleton/SkeletonBlock
// 상태 : Line · Surface · Circle (shape 값마다 하나)
// 크기 : 피그마 예시 그대로 (line 240×12, surface 120×72, circle 40×40)

import type { Meta, StoryObj } from '@storybook/react-vite';

import SkeletonBlock from './skeleton-block';

const meta = {
  title: 'Shared/Skeleton/SkeletonBlock',
  component: SkeletonBlock,
  args: {
    shape: 'line',
    className: 'h-3 w-60',
  },
  argTypes: {
    shape: {
      control: 'radio',
      options: ['line', 'surface', 'circle'],
    },
  },
} satisfies Meta<typeof SkeletonBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Line: Story = {};

export const Surface: Story = {
  args: { shape: 'surface', className: 'h-18 w-30' },
};

export const Circle: Story = {
  args: { shape: 'circle', className: 'size-10' },
};
