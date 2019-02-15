import React, { Component } from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  children: PropTypes.node,
  accordionId: PropTypes.string.isRequired,
  single: PropTypes.bool,
}

const defaultProps = {
  single: false,
  accordionId: '',
}

class Accordion extends Component {
  state = {
    activeId: null,
  }

  handlePanelUpdate = id => {
    this.setState({
      activeId: id,
    })
  }

  renderChildren = () =>
    React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        accordionId: this.props.accordionId,
        clickHandler: this.handlePanelUpdate,
        activeId: this.state.activeId,
        single: this.props.single,
      })
    )

  render() {
    return (
      <div
        className="panel-group faq_list"
        id={this.props.accordionId}
        role="tablist"
        aria-multiselectable="true"
      >
        {this.renderChildren()}
      </div>
    )
  }
}

Accordion.propTypes = propTypes
Accordion.defaultProps = defaultProps

export default Accordion
