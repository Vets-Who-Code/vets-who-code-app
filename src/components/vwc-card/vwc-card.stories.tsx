import type { Meta, StoryObj } from '@storybook/react';
import { VWCGridCard } from './index';

const meta: Meta<typeof VWCGridCard> = {
  title: 'UI/Cards/VWCGridCard',
  component: VWCGridCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof VWCGridCard>;

export const Default: Story = {
  args: {
    title: 'Vets Who Code App',
    headline: 'Official Website',
    thumbnail: {
      src: '/images/courses/330/kitchen-course-1.jpg',
      alt: 'Vets Who Code App project',
      width: 370,
      height: 229,
    },
  },
};

export const WithoutHeadline: Story = {
  args: {
    title: 'VWC Prism',
    thumbnail: {
      src: '/images/courses/330/kitchen-course-2.jpg',
      alt: 'VWC Prism project',
      width: 370,
      height: 229,
    },
  },
};

export const WithoutImage: Story = {
  args: {
    title: 'March To Code',
    headline: 'Community Initiative',
  },
};
