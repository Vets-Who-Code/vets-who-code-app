import { forwardRef } from "react";
import clsx from "clsx";
import dayjs from "dayjs";
import Button from "@ui/button";
import { IEvent } from "@utils/types";

type TProps = Pick<IEvent, "title" | "start_date" | "path" | "location"> & {
    className?: string;
};

const Event02 = forwardRef<HTMLDivElement, TProps>(
    ({ title, start_date, path, location, className }, ref) => {
        return (
            <div
                className={clsx(
                    "event-card tw-relative tw-z-10 tw-flex tw-flex-wrap tw-rounded tw-bg-light-100 tw-p-[31px] md:tw-flex-nowrap",
                    "before:tw-absolute before:tw-inset-0 before:-tw-z-1 before:tw-opacity-0 before:tw-shadow-lg before:tw-shadow-heading/10 before:tw-transition-opacity before:tw-duration-300 before:tw-content-['']",
                    "after:tw-absolute after:tw-inset-0 after:tw-right-auto after:tw-w-[3px] after:tw-rounded-bl after:tw-rounded-tl after:tw-bg-primary after:tw-opacity-0 after:tw-transition-opacity after:tw-duration-300 after:tw-content-['']",
                    "hover:tw-bg-white hover:before:tw-opacity-100 hover:after:tw-opacity-100",
                    className
                )}
                ref={ref}
            >
                <div className="tw-grow tw-pb-3.8 tw-pr-0 sm:tw-pb-0 sm:tw-pr-7.5">
                    <div className="tw-mb-[7px] tw-text-base tw-text-gray-300">
                        <i className="far fa-map-marker-alt tw-mr-[5px]" />
                        {location.city}, {location.country}
                    </div>
                    <h3 className="tw-mb-0 tw-text-xl tw-leading-normal">{title}</h3>
                </div>
                <div className="tw-shrink-0">
                    <div className="tw-mb-2.5 tw-text-left sm:tw-text-center">
                        <div className="tw-text-5xl tw-font-normal tw-leading-none tw-text-primary">
                            {dayjs(start_date).format("DD")}
                        </div>
                        <div className="tw-font-bold tw-uppercase tw-leading-none tw-tracking-wider tw-text-heading">
                            {dayjs(start_date).format("MMM")}
                        </div>
                    </div>
                    <Button path={path} size="xs">
                        Get ticket
                    </Button>
                </div>
            </div>
        );
    }
);

export default Event02;
