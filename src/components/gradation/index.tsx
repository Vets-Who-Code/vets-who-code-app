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
            "before:tw-absolute before:tw-content-[''] before:tw-opacity-0 before:tw-block before:tw-w-[100px] before:tw-h-[100px] before:tw-left-1/2 before:tw-top-1/2 before:tw-border before:tw-border-gray-400 before:tw-rounded-full before:-tw-translate-x-1/2 before:-tw-translate-y-1/2 before:tw-animate-[gradationMask_3s_linear_0s_infinite]";
        const afterClass =
            "after:tw-absolute after:tw-content-[''] after:tw-opacity-0 after:tw-block after:tw-w-[100px] after:tw-h-[100px] after:tw-left-1/2 after:tw-top-1/2 after:tw-border after:tw-border-gray-400 after:tw-rounded-full after:-tw-translate-x-1/2 after:-tw-translate-y-1/2 after:tw-animate-[gradationMask_3s_linear_0s_infinite]";
        return (
            <div
                className={clsx(
                    "tw-relative tw-flex tw-items-start lg:tw-block tw-group",
                    className
                )}
                ref={ref}
            >
                <div className="tw-absolute tw-bg-gray-550 tw-left-[39px] tw-top-3.8 tw-h-full tw-w-px lg:tw-w-full lg:tw-h-px lg:tw-top-6 lg:tw-left-3.8 group-last:tw-hidden" />
                <div className="tw-mb-14 tw-inline-block tw-relative">
                    <div className="mask tw-opacity-0 tw-invisible group-hover:tw-opacity-100 group-hover:tw-visible">
                        <div
                            className={clsx(
                                "tw-w-px tw-h-0 tw-my-0 tw-x-auto",
                                beforeClass,
                                afterClass
                            )}
                        />
                        <div
                            className={clsx(
                                "tw-w-px tw-h-0 tw-my-0 tw-x-auto",
                                beforeClass,
                                afterClass,
                                "before:tw-animate-[gradationMask_3s_linear__infinite] after:tw-animate-[gradationMask_3s_linear_1.2s_infinite]"
                            )}
                        />
                        <div
                            className={clsx(
                                "tw-w-px tw-h-0 tw-my-0 tw-x-auto",
                                beforeClass,
                                afterClass,
                                "before:tw-animate-[gradationMask_3s_linear_2.4s_infinite] after:tw-animate-[gradationMask_3s_linear_2.4s_infinite]"
                            )}
                        />
                    </div>
                    {number && (
                        <h4 className="tw-relative tw-z-1 tw-w-12 tw-h-12 tw-leading-[44px] tw-text-center tw-border-2 tw-border-gray-600 tw-bg-white tw-rounded-full tw-text-lg tw-mb-0 tw-transition-all group-hover:tw-bg-primary group-hover:tw-border-primary group-hover:tw-text-white">
                            {number}
                        </h4>
                    )}
                </div>
                <div className="tw-pt-2.5 tw-pb-[50px] tw-pr-0 tw-pl-7.5 group-last:tw-pb-0 lg:tw-p-0">
                    {title && (
                        <h3 className="tw-text-lg tw-font-bold tw-leading-relaxed tw-text-secondary tw-mb-[9px]">
                            {title}
                        </h3>
                    )}
                    {description && <p className="tw-mb-0">{description}</p>}
                </div>
            </div>
        );
    }
);

export default Gradation;
