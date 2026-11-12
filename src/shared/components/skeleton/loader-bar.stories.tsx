// [스토리] LoaderBar
// 위치 : Shared/Skeleton/LoaderBar
// 상태 : Default 하나. 너비만 피그마 예시(914px)로 지정

import type { Meta, StoryObj } from '@storybook/react-vite';

import LoaderBar from './loader-bar';

const meta = {
  title: 'Shared/Skeleton/LoaderBar',
  component: LoaderBar,
  args: {
    className: 'w-228.5',
  },
} satisfies Meta<typeof LoaderBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
