import type { Meta, StoryObj } from '@storybook/react';
import Spinner from './index';

const meta: Meta<typeof Spinner> = {
  title: 'UI/Feedback/Spinner',
  component: Spinner,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};
