import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { useState } from 'react';
import { Modal } from './index';
import ModalHeader from './modal-header';
import ModalBody from './modal-body';
import ModalClose from './modal-close';

const meta: Meta<typeof Modal> = {
  title: 'UI/Modals/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    centered: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    show: false,
    size: 'md',
    centered: true,
  },
  render: (args) => {
    const [show, setShow] = useState(args.show);
    return (
      <>
        <button onClick={() => setShow(true)}>Open Modal</button>
        <Modal
          {...args}
          show={show}
          onClose={() => setShow(false)}
          labelledBy="default-modal-title"
          describedBy="default-modal-description"
        >
          <ModalHeader>
            <h5 id="default-modal-title">Welcome to Vets Who Code</h5>
            <ModalClose onClose={() => setShow(false)}>&times;</ModalClose>
          </ModalHeader>
          <ModalBody>
            <p id="default-modal-description">Thank you for your interest in our programs. We help veterans transition into tech careers through mentorship and hands-on training.</p>
          </ModalBody>
        </Modal>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const openButton = canvas.getByText('Open Modal');
    await userEvent.click(openButton);
    const body = within(document.body);
    await expect(body.getByRole('dialog')).toBeInTheDocument();
  },
};

export const Small: Story = {
  args: {
    show: true,
    size: 'sm',
    centered: true,
  },
  render: (args) => {
    const [show, setShow] = useState(args.show);
    return (
      <>
        <button onClick={() => setShow(true)}>Open Small Modal</button>
        <Modal
          {...args}
          show={show}
          onClose={() => setShow(false)}
          labelledBy="small-modal-title"
          describedBy="small-modal-description"
        >
          <ModalHeader>
            <h5 id="small-modal-title">Confirm</h5>
            <ModalClose onClose={() => setShow(false)}>&times;</ModalClose>
          </ModalHeader>
          <ModalBody>
            <p id="small-modal-description">Are you sure you want to continue?</p>
          </ModalBody>
        </Modal>
      </>
    );
  },
};

export const Large: Story = {
  args: {
    show: true,
    size: 'lg',
    centered: true,
  },
  render: (args) => {
    const [show, setShow] = useState(args.show);
    return (
      <>
        <button onClick={() => setShow(true)}>Open Large Modal</button>
        <Modal
          {...args}
          show={show}
          onClose={() => setShow(false)}
          labelledBy="large-modal-title"
          describedBy="large-modal-description"
        >
          <ModalHeader>
            <h5 id="large-modal-title">Program Details</h5>
            <ModalClose onClose={() => setShow(false)}>&times;</ModalClose>
          </ModalHeader>
          <ModalBody>
            <p id="large-modal-description">Our full-stack web development program covers HTML, CSS, JavaScript, React, Node.js, and more. Veterans receive mentorship from experienced developers and access to job placement resources.</p>
          </ModalBody>
        </Modal>
      </>
    );
  },
};
