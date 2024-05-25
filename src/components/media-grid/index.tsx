import React from 'react';
import PropTypes from 'prop-types';
import MediaCard from '@components/media-card'; // Adjust the import path as needed

type MediaGridProps = {
    section: string;
    data: {
        image: { src: string; alt?: string; width?: number; height?: number; loading?: string; };
        title: string;
        description: string;
        type: string;
        date: string;
        path: string;
        views: number;
        slug: string;
    }[];
};

const MediaGrid: React.FC<MediaGridProps> = ({ section, data }) => {
    if (!Array.isArray(data)) {
        return null; // or some fallback UI
    }

    return (
        <div className="tw-mb-8">
            <h2 className="tw-text-2xl tw-font-bold tw-mb-4">{section}</h2>
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6">
                {data.map(item => (
                    <MediaCard
                        key={item.slug}
                        image={item.image}
                        path={item.path}
                        title={item.title}
                        type={item.type}
                        date={item.date}
                        views={item.views}
                    />
                ))}
            </div>
        </div>
    );
};

MediaGrid.propTypes = {
    section: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
        image: PropTypes.shape({
            src: PropTypes.string.isRequired,
            alt: PropTypes.string,
            width: PropTypes.number,
            height: PropTypes.number,
            loading: PropTypes.string,
        }).isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
        views: PropTypes.number.isRequired,
        slug: PropTypes.string.isRequired,
    })).isRequired,
};

export default MediaGrid;
