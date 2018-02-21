import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectPodcast } from '../actions';
import { bindActionCreators } from 'redux';

class PodcastList extends Component {
  renderList() {
    return this.props.podcasts.map(podcast => (
      <li key={podcast.title} onClick={() => this.props.selectPodcast(podcast)}>
        <h3>{podcast.title}</h3>
      </li>
    ));
  }

  render() {
    return <ul>{this.renderList()}</ul>;
  }
}

const mapStateToProps = ({ podcasts }) => ({ podcasts });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ selectPodcast }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PodcastList);
