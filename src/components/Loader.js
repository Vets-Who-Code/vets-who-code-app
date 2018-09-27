import React, { Component } from 'react';

class Loader extends Component {
  componentDidMount() {
    global.jQuery = require('../../static/vendor/jquery/dist/jquery');
    window.$ = jQuery;
    window.jQuery = jQuery;
    this.handleLoader();
  }

  handleLoader = () => {
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
