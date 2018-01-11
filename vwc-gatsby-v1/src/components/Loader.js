import React, { Component } from 'react';

class Loader extends Component {
  componentDidMount() {
    this.handleLoader();
    this.handleLoader = this.handleLoader.bind(this);
  }

  handleLoader() {
    $(window).on('load', () => {
      $('#loader').fadeOut();
      $('#loader-wrapper')
        .delay(100)
        .fadeOut();
    });
  }

  render() {
    return (
      <div id="loader-wrapper">
        <div id="loader" />
      </div>
    );
  }
}

export default Loader;
