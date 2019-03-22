import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DialogOverlay, DialogContent } from '@reach/dialog'

import '../assets/css/modal.css'

class DonateModal extends Component {
  buttonRef = React.createRef()
  iframeRef = React.createRef()

  render() {
    return (
      <>
        {this.props.modalIsOpen && (
          <DialogOverlay initialFocusRef={this.buttonRef} style={{ zIndex: 100 }}>
            <DialogContent>
              <button
                style={{
                  cursor: 'pointer',
                  color: 'inherit',
                  border: 'none',
                  padding: '5px 10px',
                  margin: '0 0 5px 0',
                }}
                className="pull-right"
                ref={this.buttonRef}
                onClick={this.props.closeModal}
              >
                <i className="fa fa-times" aria-hidden="true" />
              </button>
              <iframe
                ref={this.iframeRef}
                src="https://donorbox.org/embed/vetswhocode-donation?show_content=true"
                style={{
                  maxWidth: '100%',
                  minWidth: '100%',
                  maxHeight: 'none!important',
                }}
                seamless="seamless"
                name="donorbox"
                scrolling="yes"
                allowpaymentrequest="true"
                width="100%"
                height="685px"
                frameBorder={0}
                tabIndex={0}
              />
            </DialogContent>
          </DialogOverlay>
        )}
      </>
    )
  }
}

DonateModal.propTypes = {
  modalIsOpen: PropTypes.bool,
  closeModal: PropTypes.func,
}

export default DonateModal
