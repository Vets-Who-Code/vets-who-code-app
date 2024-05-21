import React from 'react';
import PropTypes from 'prop-types';

const MediaGrid = ({ section, data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item, index) => (
        <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg">
          <img className="w-full" src={item.image} alt={item.title} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{item.title}</div>
            <p className="text-gray-700 text-base">
              {item.description}
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            {item.tags.map((tag, index) => (
              <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{tag}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

MediaGrid.propTypes = {
  section: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
};

export default MediaGrid;
