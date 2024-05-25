import React, { forwardRef } from "react";
import clsx from "clsx";
import Anchor from "@ui/anchor";
import { IMedia } from "@utils/types";

type TProps = Pick<
    IMedia,
    "title" | "path" | "type" | "date" | "image" | "views"
> & {
    className?: string;
};

const MediaCard = forwardRef<HTMLDivElement, TProps>(
    ({ title, path, type, date, image, views, className }, ref) => {
        console.log('Image Source:', image?.src); // Debugging log
        return (
            <div
                className={clsx(
                    "media-card tw-flex tw-flex-col tw-relative tw-overflow-hidden tw-transition-all tw-duration-300 tw-rounded tw-bg-white tw-shadow-xl tw-shadow-black/5 tw-group tw-w-[280px] lg:tw-w-[320px] tw-h-auto hover:tw-transform hover:tw-translate-y-[-5px] hover:tw-shadow-2xl",
                    className
                )}
                ref={ref}
            >
                {image?.src ? (
                    <figure className="tw-relative tw-overflow-hidden tw-w-full tw-h-[200px] lg:tw-h-[250px]">
                        <img
                            className="tw-w-full tw-h-full tw-transition-transform tw-duration-500 tw-object-cover group-hover:tw-scale-110"
                            src={image.src}
                            alt={image?.alt || title}
                            width={image?.width || 500}
                            height={image?.height || 250}
                            loading={image?.loading || "lazy"}
                        />
                        <Anchor path={path} className="link-overlay">
                            {title}
                        </Anchor>
                    </figure>
                ) : (
                    <div className="tw-bg-dark/40 tw-w-full tw-h-[200px] lg:tw-h-[250px]" />
                )}

                <div className="tw-py-6.1 tw-px-7.5 lg:tw-pt-5 lg:tw-pb-[5px] lg:tw-px-[38px] tw-flex-grow tw-flex tw-flex-col tw-justify-end">
                    <Anchor
                        path={`/${type}`}
                        className="tw-font-medium tw-block tw-mb-1 -tw-tracking-tightest tw-uppercase tw-text-gray-700 hover:tw-text-gray-900"
                    >
                        {type}
                    </Anchor>
                    <h3 className="tw-text-xl tw-leading-normal lg:tw-text-[24px] lg:tw-leading-[1.42] tw-text-gray-800 tw-mb-0">
                        <Anchor className="hover:tw-text-gray-900" path={path}>
                            {title}
                        </Anchor>
                    </h3>
                    <ul className="tw-flex tw-gap-7">
                        <li className="tw-text-md tw-mt-3.8 tw-text-gray-600 tw-mb-0">
                            <i className="far fa-calendar tw-mr-2.5" />
                            {date}
                        </li>
                        <li className="tw-text-md tw-mt-3.8 tw-text-gray-600">
                            <i className="far fa-eye tw-mr-2.5" />
                            {views} views
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
);

export default MediaCard;
