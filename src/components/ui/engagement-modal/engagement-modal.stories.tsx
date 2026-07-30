import type { Meta, StoryObj } from '@storybook/react';
import { EngagementModal } from './EngagementModal';

const meta: Meta<typeof EngagementModal> = {
  title: 'UI/Modals/EngagementModal',
  component: EngagementModal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EngagementModal>;

export const Default: Story = {
  args: {
    headline: 'Join the Mission',
    body: 'We help veterans transition into tech careers through mentorship and hands-on training.',
    cta1: { label: 'Donate', href: 'https://vetswhocode.io/donate' },
    cta2: { label: 'Apply Now', href: '#apply' },
    forceShow: true,
  },
};
