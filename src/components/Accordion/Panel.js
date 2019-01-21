import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Panel extends Component {
  static propTypes = {
    title: PropTypes.string,
    body: PropTypes.string,
    id: PropTypes.string
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
    const { title, body, id } = this.props
    const { active } = this.state
    return (
      <div
        className={active ? 'panel panel-default active' : 'panel panel-default'}
        onClick={this.handleClick}
        ref={panel => (this.panel = panel)}
      >
        <div className="panel-heading" role="tab" id={`heading${id}`}>
          <h4 className="panel-title">
            <a
              className="collapsed"
              role="button"
              data-toggle="collapse"
              data-parent="#accordion"
              href={`#collapse${id}`}
              aria-expanded={active}
              aria-controls={`collapse${id}`}
            >
              {' '}
              {title}
              <i
                className={
                  active
                    ? 'fa fa-minus accordions-derective-icon pull-right'
                    : 'fa fa-plus accordions-derective-icon pull-right'
                }
              />
            </a>
          </h4>
        </div>
        <div
          id={`collapse${id}`}
          className="panel-collapse collapse"
          role="tabpanel"
          aria-labelledby={`heading${id}`}
        >
          <div className="panel-body">{body}</div>
        </div>
      </div>
    )
  }
}

export default Panel
