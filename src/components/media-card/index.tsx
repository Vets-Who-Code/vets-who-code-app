import { forwardRef } from "react";
import clsx from "clsx";
import Anchor from "@ui/anchor"; // Assuming Anchor component is suitable for external links
import { IMedia } from "@utils/types"; // Import the IMedia interface

type TProps = IMedia & {
    className?: string;
};

const MediaCard = forwardRef<HTMLDivElement, TProps>(
    ({ title, mediaType, url, publication, date, image, description, className }, ref) => (
        <div
            className={clsx(
                "media-card tw:group tw:relative tw:flex tw:flex-col tw:overflow-hidden tw:rounded-lg tw:bg-white tw:shadow-lg tw:transition-all tw:hover:shadow-xl",
                className
            )}
            ref={ref}
        >
            {image?.src && (
                <figure className="tw:relative tw:overflow-hidden">
                    <img
                        className="tw:h-52 tw:w-full tw:object-cover tw:transition-transform tw:duration-1500 tw:group-hover:scale-105" // Changed from tw:h-48
                        src={image.src}
                        alt={image?.alt || title}
                        width={image?.width || 300}
                        height={image?.height || 210} // Adjusted height to match h-52 (approx 13rem)
                        loading="lazy"
                    />
                </figure>
            )}
            <div className="tw:flex tw:grow tw:flex-col tw:p-6">
                {" "}
                {/* Changed from tw:p-5 */}
                {mediaType && (
                    <p className="tw:mb-1 tw:text-xs tw:font-medium tw:uppercase tw:text-secondary-light">
                        {mediaType}
                        {publication && <span className="tw:text-secondary"> - {publication}</span>}
                    </p>
                )}
                <h3 className="tw:mb-2 tw:text-lg tw:font-semibold tw:leading-snug">
                    {/* External link, so using a simple <a> tag or an Anchor configured for external */}
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tw:hover:text-primary"
                    >
                        {title}
                    </a>
                </h3>
                {description && (
                    <p className="tw:mb-3 tw:grow tw:text-sm tw:text-gray-700">{description}</p>
                )}
                <div className="tw:mt-auto">
                    {date && (
                        <p className="tw:text-xs tw:text-secondary">
                            <i className="far fa-calendar tw:mr-1.5" />
                            {new Date(date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                    )}
                    <Anchor
                        path={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tw:hover:text-primary-dark tw:mt-3 tw:inline-block tw:font-medium tw:text-primary"
                    >
                        View Media <i className="fas fa-external-link-alt tw:ml-1" />
                    </Anchor>
                </div>
            </div>
        </div>
    )
);

MediaCard.displayName = "MediaCard";

export default MediaCard;
