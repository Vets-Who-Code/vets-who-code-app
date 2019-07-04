import React, { useState } from 'react'
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

function Accordion({ accordionId, single, children }) {
  const [activeId, setActiveId] = useState(null)

  function clickHandler(id) {
    setActiveId(id)
  }

  function renderChildren() {
    return React.Children.map(children, child =>
      React.cloneElement(child, {
        accordionId,
        clickHandler,
        activeId,
        single,
      })
    )
  }

  return (
    <div
      className="panel-group faq_list"
      id={accordionId}
      role="tablist"
      aria-multiselectable="true"
    >
      {renderChildren()}
    </div>
  )
}

Accordion.propTypes = propTypes
Accordion.defaultProps = defaultProps

export default Accordion
