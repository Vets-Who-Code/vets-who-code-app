import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import Transition from 'react-spring/renderprops.cjs'
import { DialogOverlay, DialogContent } from '@reach/dialog'

import '@reach/dialog/styles.css'

class DonateModal extends Component {
  state = {
    loading: true,
  }

  buttonRef = React.createRef()
  iframeRef = React.createRef()

  componentDidMount = () => {
    // console.log(this.iframeRef)
  }

  handleIframeLoaded = () => {
    this.setState({ loading: false })
  }
  render() {
    return (
      <>
        {this.props.modalIsOpen && (
          <DialogOverlay initialFocusRef={this.buttonRef} style={{ zIndex: 100 }}>
            {this.state.isLoading ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  height: '685px',
                  alignItems: 'center',
                }}
              >
                <p>Loading... A spinner would probably be nice here</p>
              </div>
            ) : null}
            <DialogContent>
              <button
                className="btn btn-subscribe"
                ref={this.buttonRef}
                onClick={this.props.closeModal}
              >
                close
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
                onLoad={this.handleIframeLoaded}
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
