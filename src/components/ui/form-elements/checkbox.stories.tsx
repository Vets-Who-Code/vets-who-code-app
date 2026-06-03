import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import Checkbox from './checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Form/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['success', 'warning', 'error'],
    },
    disabled: {
      control: 'boolean',
    },
    checked: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    id: 'default-checkbox',
    name: 'terms',
    label: 'I agree to the terms and conditions',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');
    await expect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
    await userEvent.click(checkbox);
    await expect(checkbox).not.toBeChecked();
  },
};

export const Checked: Story = {
  args: {
    id: 'checked-checkbox',
    name: 'newsletter',
    label: 'Subscribe to newsletter',
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    id: 'disabled-checkbox',
    name: 'disabled',
    label: 'This option is unavailable',
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    id: 'error-checkbox',
    name: 'terms',
    label: 'I agree to the terms and conditions',
    state: 'error',
    feedbackText: 'You must accept the terms to continue',
    showState: true,
    showErrorOnly: false,
  },
};
