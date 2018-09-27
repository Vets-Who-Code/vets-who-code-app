import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

Modal.setAppElement('#___gatsby');

const container = {
  content: {
    top: '20%',
    bottom: '20%',
    height: 'auto'
  }
};

// unused variable do we need this???

// const closeButton = {
//   right: '8px'
// };

const DonateModal = ({ modalIsOpen, closeModal }) => (
  <Modal
    style={container}
    contentLabel="Donate"
    isOpen={modalIsOpen}
    onRequestClose={closeModal}
    shouldCloseOnOverlayClick
  >
    <iframe
      src="https://donorbox.org/embed/vetswhocode-donation?show_content=true"
      style={{
        maxWidth: '100%',
        minWidth: '100%',
        maxHeight: 'none!important'
      }}
      seamless="seamless"
      name="donorbox"
      scrolling="no"
      allowpaymentrequest
      width="100%"
      height="685px"
      frameBorder={0}
    />
  </Modal>
);

DonateModal.propTypes = {
  modalIsOpen: PropTypes.bool,
  closeModal: PropTypes.func
};

export default DonateModal;
