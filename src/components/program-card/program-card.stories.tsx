import type { Meta, StoryObj } from '@storybook/react';
import ProgramCard from './index';

const meta: Meta<typeof ProgramCard> = {
  title: 'UI/ProgramCard',
  component: ProgramCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProgramCard>;

export const Default: Story = {
  args: {
    program: {
      slug: 'web-development',
      title: 'Web Development',
      description: 'Learn full-stack web development with modern tools and frameworks.',
    },
  },
};

export const LongDescription: Story = {
  args: {
    program: {
      slug: 'cybersecurity',
      title: 'Cybersecurity Operations',
      description: 'Master the fundamentals of cybersecurity including network defense, threat analysis, incident response, and security operations for enterprise environments.',
    },
  },
};
