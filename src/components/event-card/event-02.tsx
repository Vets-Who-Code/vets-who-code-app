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
                    "event-card tw:relative tw:z-10 tw:flex tw:flex-wrap tw:rounded-sm tw:bg-light-100 tw:p-[31px] tw:md:flex-nowrap",
                    "tw:before:absolute tw:before:inset-0 tw:before:-z-1 tw:before:opacity-0 tw:before:shadow-lg tw:before:shadow-heading/10 tw:before:transition-opacity tw:before:duration-300 tw:before:content-['']",
                    "tw:after:absolute tw:after:inset-0 tw:after:right-auto tw:after:w-[3px] tw:after:rounded-bl tw:after:rounded-tl tw:after:bg-primary tw:after:opacity-0 tw:after:transition-opacity tw:after:duration-300 tw:after:content-['']",
                    "tw:hover:bg-white tw:hover:before:opacity-100 tw:hover:after:opacity-100",
                    className
                )}
                ref={ref}
            >
                <div className="tw:grow tw:pb-3.8 tw:pr-0 tw:sm:pb-0 tw:sm:pr-7.5">
                    <div className="tw:mb-[7px] tw:text-base tw:text-gray-300">
                        <i className="far fa-map-marker-alt tw:mr-[5px]" />
                        {location.city}, {location.country}
                    </div>
                    <h3 className="tw:mb-0 tw:text-xl tw:leading-normal">{title}</h3>
                </div>
                <div className="tw:shrink-0">
                    <div className="tw:mb-2.5 tw:text-left tw:sm:text-center">
                        <div className="tw:text-5xl tw:font-normal tw:leading-none tw:text-primary">
                            {dayjs(start_date).format("DD")}
                        </div>
                        <div className="tw:font-bold tw:uppercase tw:leading-none tw:tracking-wider tw:text-heading">
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
