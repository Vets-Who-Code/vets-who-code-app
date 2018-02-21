import React from 'react';
import { connect } from 'react-redux';

const PodcastListItem = ({ podcast }) => {
  if (!podcast) return <p>Select a Podcast.</p>;
  return <h3>{podcast.title}</h3>;
};

const mapStateToProps = ({ activePodcast }) => ({ podcast: activePodcast });

export default connect(mapStateToProps)(PodcastListItem);
