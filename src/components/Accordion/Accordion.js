import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Accordion extends Component {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.object),
  }

  renderChildren = () => React.Children.map(this.props.children, child => React.cloneElement(child))

  render() {
    return (
      <div
        className="panel-group faq_list"
        id="accordion"
        role="tablist"
        aria-multiselectable="true"
      >
        {this.renderChildren()}
      </div>
    )
  }
}

export default Accordion
