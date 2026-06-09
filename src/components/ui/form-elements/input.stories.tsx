import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import Input from './input';

const meta: Meta<typeof Input> = {
  title: 'UI/Form/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number'],
    },
    bg: {
      control: 'select',
      options: ['white', 'light'],
    },
    state: {
      control: 'select',
      options: ['success', 'warning', 'error'],
    },
    disabled: {
      control: 'boolean',
    },
    readonly: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    id: 'default-input',
    name: 'default',
    placeholder: 'Enter your name',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('Enter your name');
    await userEvent.click(input);
    await userEvent.type(input, 'Jane Doe');
    await expect(input).toHaveValue('Jane Doe');
  },
};

export const Email: Story = {
  args: {
    id: 'email-input',
    name: 'email',
    type: 'email',
    placeholder: 'you@example.com',
  },
};

export const WithError: Story = {
  args: {
    id: 'error-input',
    name: 'email',
    type: 'email',
    placeholder: 'you@example.com',
    value: 'invalid-email',
    state: 'error',
    feedbackText: 'Please enter a valid email address',
    showState: true,
    showErrorOnly: false,
  },
};

export const WithSuccess: Story = {
  args: {
    id: 'success-input',
    name: 'username',
    placeholder: 'Username',
    value: 'veteran_coder',
    state: 'success',
    feedbackText: 'Username is available',
    showState: true,
    showErrorOnly: false,
  },
};

export const Disabled: Story = {
  args: {
    id: 'disabled-input',
    name: 'disabled',
    placeholder: 'Cannot edit this field',
    disabled: true,
  },
};

export const LightBackground: Story = {
  args: {
    id: 'light-input',
    name: 'light',
    placeholder: 'Light background input',
    bg: 'light',
  },
};
