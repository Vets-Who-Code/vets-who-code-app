import PropTypes from 'prop-types'
import { useAccordion } from './Accordion'
import { FaMinus, FaPlus } from 'react-icons/fa'

function Panel({ body, title, id }) {
  const { onClick, isOpen, accordionId } = useAccordion(id)

  function toggle(e) {
    if (e.keyCode === 13 || e.type === 'click') {
      onClick(id)
    }
  }

  return (
    <div
      role="tab"
      onKeyDown={e => toggle(e)}
      className={`panel panel-default ${isOpen ? 'active' : ''}`}
    >
      <div
        onClick={e => toggle(e)}
        role="button"
        id={`heading-${id}`}
        className="panel-heading"
        tabIndex="0"
      >
        <h2 className="panel-title">
          <a
            className="collapsed"
            data-toggle="collapse"
            data-parent={`#${accordionId}`}
            aria-expanded={isOpen}
            aria-controls={`collapse-${id}`}
          >
            <div>{typeof title === 'function' ? title() : title}</div>
            {isOpen ? (
              <FaMinus className="minus" aria-label="close accordion" />
            ) : (
              <FaPlus className="plus" aria-label="expand accordion" />
            )}
          </a>
        </h2>
      </div>
      <div
        style={{
          padding: isOpen ? '40px 15px' : '0 15px',
          transition: 'all ease 0.5s',
          willChange: 'height, padding',
        }}
        role="tabpanel"
        aria-labelledby={`heading-${id}`}
        aria-hidden={!isOpen}
      >
        {isOpen && <div>{typeof body === 'function' ? body() : body}</div>}
      </div>
    </div>
  )
}

Panel.propTypes = {
  body: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
}

export default Panel
