import type { Meta, StoryObj } from '@storybook/react-vite';

import LoadingSpinner from '@/shared/components/loading-spinner/loading-spinner';

const meta = {
  title: 'Shared/LoadingSpinner',
  component: LoadingSpinner,
  tags: ['autodocs'],
} satisfies Meta<typeof LoadingSpinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
