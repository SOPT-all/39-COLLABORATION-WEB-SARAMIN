import type { Meta, StoryObj } from '@storybook/react-vite';

import ModalButton from './modal-button';

const meta = {
  title: 'Shared/Button/ModalButton',
  component: ModalButton,
  args: {
    children: '버튼',
    variant: 'primary',
    disabled: false,
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
    },
  },
} satisfies Meta<typeof ModalButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: 'secondary' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const SecondaryDisabled: Story = {
  args: { variant: 'secondary', disabled: true },
};
