import React from "react";
import PropTypes from "prop-types";
import { IMedia } from "@utils/types";

type MediaGridProps = {
    section: string;
    data: IMedia[];
};

const MediaGrid: React.FC<MediaGridProps> = ({ section, data }) => {
    if (!Array.isArray(data)) {
        return null; // or some fallback UI
    }

    return (
        <div>
            <h2 className="tw-text-2xl tw-font-bold tw-mb-4">{section}</h2>
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-4">
                {data.map((item, index) => (
                    <div key={index} className="tw-max-w-sm tw-rounded tw-overflow-hidden tw-shadow-lg">
                        <img className="tw-w-full" src={item.image} alt={item.title} />
                        <div className="tw-px-6 tw-py-4">
                            <div className="tw-font-bold tw-text-xl tw-mb-2">{item.title}</div>
                            <p className="tw-text-gray-700 tw-text-base">
                                {item.description}
                            </p>
                        </div>
                        <div className="tw-px-6 tw-pt-4 tw-pb-2">
                            {item.tags.map((tag, index) => (
                                <span key={index} className="tw-inline-block tw-bg-gray-200 tw-rounded-full tw-px-3 tw-py-1 tw-text-sm tw-font-semibold tw-text-gray-700 tw-mr-2 tw-mb-2">#{tag}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

MediaGrid.propTypes = {
    section: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string.isRequired,
            slug: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired,
        })),
    })).isRequired,
};

export default MediaGrid;
