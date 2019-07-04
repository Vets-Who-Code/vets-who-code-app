import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

function Panel(props) {
  const { activeId, id, single, clickHandler, accordionId, body, title } = props
  const panelRef = useRef()
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (!single) {
      openMultiplePanels()
    } else {
      openSinglePanel()
    }
  }, [activeId, id, single])

  function openMultiplePanels() {
    if (activeId === id && !active) {
      setActive(true)
    } else if (activeId === id && active) {
      setActive(false)
    }
  }

  function openSinglePanel() {
    if (activeId === id && !active) {
      setActive(true)
    } else {
      setActive(false)
    }
  }

  function handleClick() {
    openMultiplePanels()
    clickHandler(id)
  }

  return (
    <div ref={panelRef} className={`panel panel-default ${active ? 'active' : ''}`}>
      <div onClick={handleClick} id={`heading-${id}`} className="panel-heading" role="tab">
        <h4 className="panel-title">
          <a
            className="collapsed"
            role="button"
            data-toggle="collapse"
            data-parent={`#${accordionId}`}
            aria-expanded={active}
            aria-controls={`collapse-${id}`}
          >
            <div>{typeof title === 'function' ? title() : title}</div>
            <i
              className={`accordions-derective-icon pull-right
                  ${active ? 'fa fa-minus' : 'fa fa-plus'}
                `}
            />
          </a>
        </h4>
      </div>
      <div
        style={{
          padding: active ? '40px 15px' : '0 15px',
          transition: 'all ease 0.5s',
          willChange: 'height, padding',
        }}
        role="tabpanel"
        aria-labelledby={`heading-${id}`}
        aria-hidden={!active}
      >
        {active && <div>{typeof body === 'function' ? body() : body}</div>}
      </div>
    </div>
  )
}

Panel.propTypes = {
  accordionId: PropTypes.string,
  activeId: PropTypes.number,
  body: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  clickHandler: PropTypes.func,
  id: PropTypes.number,
  single: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
}

export default Panel
