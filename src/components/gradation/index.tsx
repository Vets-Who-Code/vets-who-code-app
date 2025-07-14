import { forwardRef } from "react";
import clsx from "clsx";

type TProps = {
    number: number;
    title: string;
    description: string;
    className?: string;
};

const Gradation = forwardRef<HTMLDivElement, TProps>(
    ({ number, title, description, className }, ref) => {
        const beforeClass =
            "tw:before:absolute tw:before:content-[''] tw:before:opacity-0 tw:before:block tw:before:w-[100px] tw:before:h-[100px] tw:before:left-1/2 tw:before:top-1/2 tw:before:border tw:before:border-gray-400 tw:before:rounded-full tw:before:-translate-x-1/2 tw:before:-translate-y-1/2 tw:before:animate-[gradationMask_3s_linear_0s_infinite]";
        const afterClass =
            "tw:after:absolute tw:after:content-[''] tw:after:opacity-0 tw:after:block tw:after:w-[100px] tw:after:h-[100px] tw:after:left-1/2 tw:after:top-1/2 tw:after:border tw:after:border-gray-400 tw:after:rounded-full tw:after:-translate-x-1/2 tw:after:-translate-y-1/2 tw:after:animate-[gradationMask_3s_linear_0s_infinite]";
        return (
            <div
                className={clsx(
                    "tw:group tw:relative tw:flex tw:items-start tw:lg:block",
                    className
                )}
                ref={ref}
            >
                <div className="tw:absolute tw:left-[39px] tw:top-3.8 tw:h-full tw:w-px tw:bg-gray-550 tw:group-last:hidden tw:lg:left-3.8 tw:lg:top-6 tw:lg:h-px tw:lg:w-full" />
                <div className="tw:relative tw:mb-14 tw:inline-block">
                    <div className="mask tw:invisible tw:opacity-0 tw:group-hover:visible tw:group-hover:opacity-100">
                        <div
                            className={clsx(
                                "tw:x-auto tw:my-0 tw:h-0 tw:w-px",
                                beforeClass,
                                afterClass
                            )}
                        />
                        <div
                            className={clsx(
                                "tw:x-auto tw:my-0 tw:h-0 tw:w-px",
                                beforeClass,
                                afterClass,
                                "tw:before:animate-[gradationMask_3s_linear__infinite] tw:after:animate-[gradationMask_3s_linear_1.2s_infinite]"
                            )}
                        />
                        <div
                            className={clsx(
                                "tw:x-auto tw:my-0 tw:h-0 tw:w-px",
                                beforeClass,
                                afterClass,
                                "tw:before:animate-[gradationMask_3s_linear_2.4s_infinite] tw:after:animate-[gradationMask_3s_linear_2.4s_infinite]"
                            )}
                        />
                    </div>
                    {number && (
                        <h4 className="tw:relative tw:z-1 tw:mb-0 tw:h-12 tw:w-12 tw:rounded-full tw:border-2 tw:border-gray-600 tw:bg-white tw:text-center tw:text-lg tw:leading-[44px] tw:transition-all tw:group-hover:border-primary tw:group-hover:bg-primary tw:group-hover:text-white">
                            {number}
                        </h4>
                    )}
                </div>
                <div className="tw:pb-[50px] tw:pl-7.5 tw:pr-0 tw:pt-2.5 tw:group-last:pb-0 tw:lg:p-0">
                    {title && (
                        <h3 className="tw:mb-[9px] tw:text-lg tw:font-bold tw:leading-relaxed tw:text-secondary">
                            {title}
                        </h3>
                    )}
                    {description && <p className="tw:mb-0">{description}</p>}
                </div>
            </div>
        );
    }
);

export default Gradation;
