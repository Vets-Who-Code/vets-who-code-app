import type { Meta, StoryObj } from '@storybook/react';
import MainMenu from './index';

const sampleMenu = [
  { id: 1, label: 'Home', path: '/' },
  { id: 2, label: 'About', path: '/about' },
  { id: 3, label: 'Programs', path: '/programs', submenu: [
    { id: 31, label: 'Web Development', path: '/programs/web-development' },
    { id: 32, label: 'Cybersecurity', path: '/programs/cybersecurity' },
  ]},
  { id: 4, label: 'Projects', path: '/projects' },
  { id: 5, label: 'Contact', path: '/contact' },
];

const meta: Meta<typeof MainMenu> = {
  title: 'UI/Navigation/MainMenu',
  component: MainMenu,
  tags: ['autodocs'],
  argTypes: {
    hoverStyle: {
      control: 'select',
      options: ['A', 'B'],
    },
    color: {
      control: 'select',
      options: ['light', 'dark'],
    },
    align: {
      control: 'select',
      options: ['left', 'right', 'center'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof MainMenu>;

export const Dark: Story = {
  args: {
    menu: sampleMenu,
    color: 'dark',
    hoverStyle: 'A',
    align: 'left',
  },
};

export const Light: Story = {
  args: {
    menu: sampleMenu,
    color: 'light',
    hoverStyle: 'A',
    align: 'left',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1a1a2e', padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithHoverStyleB: Story = {
  args: {
    menu: sampleMenu,
    color: 'dark',
    hoverStyle: 'B',
    align: 'center',
  },
};
