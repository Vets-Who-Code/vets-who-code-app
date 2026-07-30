import type { Meta, StoryObj } from '@storybook/react';
import Textarea from './textarea';

const meta: Meta<typeof Textarea> = {
  title: 'UI/Form/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
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
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    id: 'default-textarea',
    name: 'message',
    placeholder: 'Write your message here...',
  },
};

export const WithError: Story = {
  args: {
    id: 'error-textarea',
    name: 'message',
    placeholder: 'Write your message here...',
    state: 'error',
    feedbackText: 'Message is required',
    showState: true,
    showErrorOnly: false,
  },
};

export const Disabled: Story = {
  args: {
    id: 'disabled-textarea',
    name: 'message',
    placeholder: 'Cannot edit this field',
    disabled: true,
  },
};

export const LightBackground: Story = {
  args: {
    id: 'light-textarea',
    name: 'message',
    placeholder: 'Light background textarea',
    bg: 'light',
  },
};
