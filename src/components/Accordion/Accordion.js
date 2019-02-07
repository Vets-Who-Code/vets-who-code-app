import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Accordion extends Component {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.object),
    accordionId: PropTypes.string.isRequired,
  }

  renderChildren = () =>
    React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        accordionId: this.props.accordionId,
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

export default Accordion
