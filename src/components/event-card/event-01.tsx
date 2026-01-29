import { forwardRef } from "react";
import clsx from "clsx";
import { formatDate } from "@utils/date";
import Anchor from "@ui/anchor";
import Button from "@ui/button";
import { IEvent } from "@utils/types";

interface TProps extends Pick<IEvent, "thumbnail" | "title" | "path" | "start_date" | "location"> {
    className?: string;
}

const Event01 = forwardRef<HTMLDivElement, TProps>(
    ({ thumbnail, title, path, start_date, location, className }, ref) => {
        return (
            <div
                className={clsx(
                    "event tw-group tw-relative tw-h-full tw-rounded tw-bg-cream",
                    "before:tw-absolute before:tw-inset-0 before:tw-opacity-0 before:tw-shadow-4xl before:tw-shadow-black/[0.12] before:tw-transition-opacity before:tw-duration-300 before:tw-content-['']",
                    "hover:before:tw-opacity-100",
                    className
                )}
                ref={ref}
            >
                <div className="max-w-full tw-relative tw-h-[230px] tw-overflow-hidden tw-rounded-t">
                    {thumbnail?.src && (
                        <figure className="tw-group-hover:tw-scale-110 tw-h-full tw-transition-transform tw-duration-1500">
                            <img
                                className="tw-h-full tw-w-full tw-object-cover"
                                src={thumbnail.src}
                                alt={thumbnail?.alt || "Event"}
                                width={thumbnail.width || 371}
                                height={thumbnail.height || 230}
                                loading={thumbnail.loading || "lazy"}
                            />
                        </figure>
                    )}
                    <div className="tw-invisible tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center tw-bg-secondary/60 tw-opacity-0 tw-transition-opacity tw-duration-300 group-hover:tw-visible group-hover:tw-opacity-100">
                        <Button color="light" hover={false} className="tw-text-primary" path={path}>
                            Get ticket
                        </Button>
                    </div>
                </div>
                <div className="info tw-relative tw-z-1 tw-px-7.5 tw-pb-10 tw-pt-7.5 tw-text-center">
                    <p className="tw-mb-1 tw-font-semibold tw-uppercase -tw-tracking-tightest tw-text-primary">
                        {formatDate(start_date)}
                    </p>
                    <h3 className="tw-mb-0 tw-text-xl tw-leading-normal tw-text-secondary">
                        <Anchor path={path}>{title}</Anchor>
                    </h3>
                    <p className="tw-mb-0 tw-mt-6.1 tw-text-[17px]">
                        <i className="far fa-map-marker-alt tw-mr-2.5" />
                        {location.city}, {location.country}
                    </p>
                </div>
            </div>
        );
    }
);

export default Event01;
