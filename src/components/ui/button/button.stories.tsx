import type { Meta, StoryObj } from '@storybook/react';
import Button from './index';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'texted'],
    },
    color: {
      control: 'select',
      options: ['primary', 'light'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    fullwidth: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    active: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Get Started',
    variant: 'contained',
    color: 'primary',
    size: 'md',
  },
};

export const Outlined: Story = {
  args: {
    children: 'Learn More',
    variant: 'outlined',
    color: 'primary',
    size: 'md',
  },
};

export const Light: Story = {
  args: {
    children: 'Sign Up',
    variant: 'contained',
    color: 'light',
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    children: 'Details',
    variant: 'contained',
    color: 'primary',
    size: 'sm',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Unavailable',
    variant: 'contained',
    color: 'primary',
    size: 'md',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    children: 'Submit Application',
    variant: 'contained',
    color: 'primary',
    size: 'md',
    fullwidth: true,
  },
};

export const AsLink: Story = {
  args: {
    children: 'Visit Page',
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    path: '/about',
  },
};
