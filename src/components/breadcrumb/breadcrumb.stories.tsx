import type { Meta, StoryObj } from '@storybook/react';
import Breadcrumb from './index';

const meta: Meta<typeof Breadcrumb> = {
  title: 'UI/Navigation/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  argTypes: {
    showTitle: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  args: {
    pages: [
      { path: '/', label: 'Home' },
      { path: '/programs', label: 'Programs' },
    ],
    currentPage: 'Web Development',
    showTitle: true,
  },
};

export const WithoutTitle: Story = {
  args: {
    pages: [
      { path: '/', label: 'Home' },
      { path: '/programs', label: 'Programs' },
    ],
    currentPage: 'Web Development',
    showTitle: false,
  },
};

export const DeepNesting: Story = {
  args: {
    pages: [
      { path: '/', label: 'Home' },
      { path: '/programs', label: 'Programs' },
      { path: '/programs/web-development', label: 'Web Development' },
    ],
    currentPage: 'Module 1',
    showTitle: true,
    title: 'JavaScript Fundamentals',
  },
};
