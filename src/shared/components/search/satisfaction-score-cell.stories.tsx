// [스토리] SatisfactionScoreCell
// 상태 : Default · 0~10 점수 칸

import type { Meta, StoryObj } from '@storybook/react-vite';

import SatisfactionScoreCell from './satisfaction-score-cell';

const SCORES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const meta = {
  title: 'Shared/Search/SatisfactionScoreCell',
  component: SatisfactionScoreCell,
  args: {
    score: 8,
  },
} satisfies Meta<typeof SatisfactionScoreCell>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Scale: Story = {
  render: (args) => (
    <div className="flex">
      {SCORES.map((score) => (
        <SatisfactionScoreCell key={score} {...args} score={score} />
      ))}
    </div>
  ),
};
