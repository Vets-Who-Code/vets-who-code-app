import React, { Component } from 'react'

class Panel extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isActive: false }
  }

  render() {
    const { title, body, id } = this.props
    const { isActive } = this.state
    return (
      <div
        className={isActive ? 'panel panel-default active' : 'panel panel-default'}
        onClick={this.handleClick}
      >
        <div className="panel-heading" role="tab" id={'heading' + id}>
          <h4 className="panel-title">
            <a
              className="collapsed"
              role="button"
              data-toggle="collapse"
              data-parent="#accordion"
              href={'#collapse' + id}
              aria-expanded={isActive}
              aria-controls={'collapse' + id}
            >
              {' '}
              {title}
              <i
                className={
                  isActive
                    ? 'fa fa-minus accordions-derective-icon pull-right'
                    : 'fa fa-plus accordions-derective-icon pull-right'
                }
              />
            </a>
          </h4>
        </div>
        <div
          id={'collapse' + id}
          className="panel-collapse collapse"
          role="tabpanel"
          aria-labelledby={'heading' + id}
        >
          <div className="panel-body">{body}</div>
        </div>
      </div>
    )
  }
}

export default Panel
