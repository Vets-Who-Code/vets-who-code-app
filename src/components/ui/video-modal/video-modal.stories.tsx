import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import VideoModal from './index';

const meta: Meta<typeof VideoModal> = {
  title: 'UI/VideoModal',
  component: VideoModal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof VideoModal>;

export const Default: Story = {
  args: {
    videoId: 'S4lpKm9mbVk',
    show: true,
  },
  render: (args) => {
    const [show, setShow] = useState(args.show);
    return (
      <>
        <button onClick={() => setShow(true)}>Play Video</button>
        <VideoModal {...args} show={show} onClose={() => setShow(false)} />
      </>
    );
  },
};
