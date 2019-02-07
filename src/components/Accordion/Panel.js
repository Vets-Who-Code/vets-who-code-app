import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Spring } from 'react-spring/renderprops.cjs'

const StyledPanel = styled.div`
  height: ${({ active }) => (active ? 'auto' : 0)};
  display: 'none';
  opacity: ${({ active }) => (active ? 1 : 0)};
  transition: all ease-in-out 0.2s;
`

class Panel extends Component {
  static propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    body: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    id: PropTypes.string,
    accordionId: PropTypes.string,
  }

  state = {
    active: false,
  }

  handleDocumentClick = event => {
    if (!this.panel.contains(event.target) && this.state.active) {
      this.setState({ active: false })
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick, false)
    document.addEventListener('touchend', this.handleDocumentClick, false)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick, false)
    document.removeEventListener('touchend', this.handleDocumentClick, false)
  }

  handleClick = () => {
    this.setState({ active: !this.state.active })
  }

  render() {
    const { title, body, id, accordionId } = this.props
    const { active } = this.state
    return (
      <div
        className={`panel panel-default ${active ? 'active' : ''}`}
        onClick={this.handleClick}
        ref={panel => (this.panel = panel)}
      >
        <div className="panel-heading" role="tab" id={`heading${id}`}>
          <h4 className="panel-title">
            <a
              // className="collapsed"
              role="button"
              data-toggle="collapse"
              data-parent={`#${accordionId}`}
              href={`#collapse${id}`}
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
        <Spring
          from={{
            height: 0,
            opacity: 0,
          }}
          to={{
            height: 'auto',
            opacity: 1,
          }}
        >
          {springProps => (
            <StyledPanel
              id={`collapse${id}`}
              style={{ springProps }}
              role="tabpanel"
              aria-labelledby={`heading${id}`}
              aria-hidden={!active}
              active={active}
            >
              <div className="panel-body">{typeof body === 'function' ? body() : body}</div>
            </StyledPanel>
          )}
        </Spring>
      </div>
    )
  }
}

export default Panel
