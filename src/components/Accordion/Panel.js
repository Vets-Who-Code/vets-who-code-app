import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Spring } from 'react-spring/renderprops.cjs' // please leave this import as is. The test sweet needs this to run properly

const StyledPanel = styled.div`
  padding: ${({ active }) => (active ? '40px 15px' : '0 15px')};
  height: ${({ active }) => (active ? 'auto' : 0)};
  will-change: height, padding;
  transition: all ease 0.5s;
`

class Panel extends Component {
  static propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    body: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    id: PropTypes.number,
    accordionId: PropTypes.string,
    activeId: PropTypes.number,
    clickHandler: PropTypes.func,
  }

  state = {
    active: false,
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { activeId, single } = prevProps

    if (single && this.props.activeId !== activeId && prevState.active) {
      this.toggleActive()
    }
  }

  toggleActive = () => {
    this.setState(({ active }) => ({ active: !active }))
  }

  handleClick = () => {
    this.toggleActive()
    this.props.clickHandler(this.props.id)
  }

  render() {
    const { title, body, id, accordionId } = this.props
    const { active } = this.state
    return (
      <div
        ref={ref => (this.panel = ref)}
        className={`panel panel-default ${active ? 'active' : ''}`}
      >
        <div onClick={this.handleClick} id={`heading${id}`} className="panel-heading" role="tab">
          <h4 className="panel-title">
            <a
              className="collapsed"
              role="button"
              data-toggle="collapse"
              data-parent={`#${accordionId}`}
              aria-expanded={active}
              aria-controls={`collapse${id}`}
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
        <StyledPanel
          role="tabpanel"
          aria-labelledby={`heading${id}`}
          aria-hidden={!active}
          active={active}
        >
          {active && (
            <Spring
              active={active}
              from={{ number: 0, opacity: 0 }}
              to={{ number: 10, opacity: 1 }}
              delay={50}
            >
              {springProps => (
                <div style={springProps}>{typeof body === 'function' ? body() : body}</div>
              )}
            </Spring>
          )}
        </StyledPanel>
      </div>
    )
  }
}

export default Panel
