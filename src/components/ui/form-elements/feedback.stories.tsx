import type { Meta, StoryObj } from '@storybook/react';
import Feedback from './feedback';

const meta: Meta<typeof Feedback> = {
  title: 'UI/Feedback/Feedback',
  component: Feedback,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['success', 'warning', 'error'],
    },
    showErrorOnly: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Feedback>;

export const Error: Story = {
  args: {
    state: 'error',
    children: 'Please enter a valid email address',
  },
};

export const Warning: Story = {
  args: {
    state: 'warning',
    children: 'This field will be required soon',
  },
};

export const Success: Story = {
  args: {
    state: 'success',
    children: 'Username is available',
  },
};

export const ErrorOnly: Story = {
  args: {
    state: 'warning',
    showErrorOnly: true,
    children: 'This message is hidden because showErrorOnly is true',
  },
};
