import { forwardRef } from "react";
import clsx from "clsx";
import dayjs from "dayjs";
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
                    "event tw:group tw:relative tw:h-full tw:rounded-sm tw:bg-gray-100",
                    "tw:before:absolute tw:before:inset-0 tw:before:opacity-0 tw:before:shadow-4xl tw:before:shadow-black/12 tw:before:transition-opacity tw:before:duration-300 tw:before:content-['']",
                    "tw:hover:before:opacity-100",
                    className
                )}
                ref={ref}
            >
                <div className="tw:relative tw:h-[230px] tw:overflow-hidden tw:rounded-t max-w-full">
                    {thumbnail?.src && (
                        <figure className="tw:h-full tw:transition-transform tw:duration-1500 tw:group-hover:scale-110">
                            <img
                                className="tw:h-full tw:w-full tw:object-cover"
                                src={thumbnail.src}
                                alt={thumbnail?.alt || "Event"}
                                width={thumbnail.width || 371}
                                height={thumbnail.height || 230}
                                loading={thumbnail.loading || "lazy"}
                            />
                        </figure>
                    )}
                    <div className="tw:invisible tw:absolute tw:inset-0 tw:flex tw:items-center tw:justify-center tw:bg-secondary/60 tw:opacity-0 tw:transition-opacity tw:duration-300 tw:group-hover:visible tw:group-hover:opacity-100">
                        <Button color="light" hover={false} className="tw:text-primary" path={path}>
                            Get ticket
                        </Button>
                    </div>
                </div>
                <div className="info tw:relative tw:z-1 tw:px-7.5 tw:pb-10 tw:pt-7.5 tw:text-center">
                    <p className="tw:mb-1 tw:font-semibold tw:uppercase tw:-tracking-tightest tw:text-primary">
                        {dayjs(start_date).format("MMM DD, YYYY")}
                    </p>
                    <h3 className="tw:mb-0 tw:text-xl tw:leading-normal tw:text-secondary">
                        <Anchor path={path}>{title}</Anchor>
                    </h3>
                    <p className="tw:mb-0 tw:mt-6.1 tw:text-[17px]">
                        <i className="far fa-map-marker-alt tw:mr-2.5" />
                        {location.city}, {location.country}
                    </p>
                </div>
            </div>
        );
    }
);

export default Event01;
