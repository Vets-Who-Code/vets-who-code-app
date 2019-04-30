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
          <DialogOverlay
            initialFocusRef={this.buttonRef}
            style={{
              background: 'hsla(0, 100%, 100%, 0.9)',
              zIndex: 100,
              overflowY: 'scroll',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <DialogContent
              style={{
                boxShadow: '0px 10px 50px hsla(0, 0%, 0%, 0.33)',
                padding: 10,
              }}
            >
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
                  // maxWidth: '70%',
                  minWidth: '80%',
                  maxHeight: 'none!important',
                  marginLeft: 45,
                  marginTop: 10,
                }}
                seamless="seamless"
                name="donorbox"
                scrolling="yes"
                allowpaymentrequest="true"
                width="80%"
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
