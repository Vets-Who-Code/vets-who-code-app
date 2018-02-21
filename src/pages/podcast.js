import React from 'react';
import Link from 'gatsby-link';
import PodcastList from '../containers/PodcastList';
import PodcastListItem from '../containers/PodcastListItem';
import thisIsUs from '../images/this_is_us.png';

const Podcast = () => {
  return (
    <div>
      <header
        className="inner-header overlay grey text-center slim-bg"
        style={{
          backgroundImage: `url(${thisIsUs})`,
          backgroundPositionY: 'bottom'
        }}
      >
        <div className="overlay-01" />
        <div className="container">
          <h2 className="text-center text-uppercase">Podcast</h2>
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/podcast" className="page-active">
              Podcast
            </Link>
          </div>
        </div>
      </header>
      <section className="small-top-pad section bg-default">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3 className="story-title">Our Podcasts</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <PodcastList />
              <PodcastListItem />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Podcast;
