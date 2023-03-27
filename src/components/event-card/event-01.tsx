import { forwardRef } from "react";
import clsx from "clsx";
import dayjs from "dayjs";
import Anchor from "@ui/anchor";
import Button from "@ui/button";
import { IEvent } from "@utils/types";

interface TProps
    extends Pick<
        IEvent,
        "thumbnail" | "title" | "path" | "start_date" | "location"
    > {
    className?: string;
}

const Event01 = forwardRef<HTMLDivElement, TProps>(
    ({ thumbnail, title, path, start_date, location, className }, ref) => {
        return (
            <div
                className={clsx(
                    "event tw-h-full tw-relative tw-bg-gray-100 tw-group tw-rounded",
                    "before:tw-absolute before:tw-content-[''] before:tw-inset-0 before:tw-shadow-4xl before:tw-shadow-black/[0.12] before:tw-opacity-0 before:tw-transition-opacity before:tw-duration-300",
                    "hover:before:tw-opacity-100",
                    className
                )}
                ref={ref}
            >
                <div className="tw-relative tw-overflow-hidden tw-rounded-t max-w-full tw-h-[230px]">
                    {thumbnail?.src && (
                        <figure className="tw-transition-transform tw-duration-1500 group-hover:tw-scale-110 tw-h-full">
                            <img
                                className="tw-w-full tw-h-full tw-object-cover"
                                src={thumbnail.src}
                                alt={thumbnail?.alt || "Event"}
                                width={thumbnail.width || 371}
                                height={thumbnail.height || 230}
                                loading={thumbnail.loading || "lazy"}
                            />
                        </figure>
                    )}
                    <div className="tw-absolute tw-inset-0 tw-bg-secondary/60 tw-transition-opacity tw-duration-300 tw-flex tw-justify-center tw-items-center tw-invisible tw-opacity-0 group-hover:tw-visible group-hover:tw-opacity-100">
                        <Button
                            color="light"
                            hover={false}
                            className="tw-text-primary"
                            path={path}
                        >
                            Get ticket
                        </Button>
                    </div>
                </div>
                <div className="info tw-relative tw-z-1 tw-pt-7.5 tw-pb-10 tw-px-7.5 tw-text-center">
                    <p className="tw-uppercase tw-font-semibold tw-mb-1 -tw-tracking-tightest tw-text-primary">
                        {dayjs(start_date).format("MMM DD, YYYY")}
                    </p>
                    <h3 className="tw-text-xl tw-leading-normal tw-mb-0 tw-text-secondary">
                        <Anchor path={path}>{title}</Anchor>
                    </h3>
                    <p className="tw-text-[17px] tw-mt-6.1 tw-mb-0">
                        <i className="far fa-map-marker-alt tw-mr-2.5" />
                        {location.city}, {location.country}
                    </p>
                </div>
            </div>
        );
    }
);

export default Event01;
