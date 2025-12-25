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
                    "tw-group tw-relative tw-flex tw-items-start lg:tw-block",
                    className
                )}
                ref={ref}
            >
                <div className="tw-absolute tw-left-[39px] tw-top-3.8 tw-h-full tw-w-px tw-bg-gray-50 group-last:tw-hidden lg:tw-left-3.8 lg:tw-top-6 lg:tw-h-px lg:tw-w-full" />
                <div className="tw-relative tw-mb-14 tw-inline-block">
                    <div className="mask tw-invisible tw-opacity-0 group-hover:tw-visible group-hover:tw-opacity-100">
                        <div
                            className={clsx(
                                "tw-x-auto tw-my-0 tw-h-0 tw-w-px",
                                beforeClass,
                                afterClass
                            )}
                        />
                        <div
                            className={clsx(
                                "tw-x-auto tw-my-0 tw-h-0 tw-w-px",
                                beforeClass,
                                afterClass,
                                "before:tw-animate-[gradationMask_3s_linear__infinite] after:tw-animate-[gradationMask_3s_linear_1.2s_infinite]"
                            )}
                        />
                        <div
                            className={clsx(
                                "tw-x-auto tw-my-0 tw-h-0 tw-w-px",
                                beforeClass,
                                afterClass,
                                "before:tw-animate-[gradationMask_3s_linear_2.4s_infinite] after:tw-animate-[gradationMask_3s_linear_2.4s_infinite]"
                            )}
                        />
                    </div>
                    {number && (
                        <h4 className="tw-relative tw-z-1 tw-mb-0 tw-h-12 tw-w-12 tw-rounded-full tw-border-2 tw-border-gray-600 tw-bg-white tw-text-center tw-text-lg tw-leading-[44px] tw-transition-all group-hover:tw-border-primary group-hover:tw-bg-primary group-hover:tw-text-white">
                            {number}
                        </h4>
                    )}
                </div>
                <div className="tw-pb-[50px] tw-pl-7.5 tw-pr-0 tw-pt-2.5 group-last:tw-pb-0 lg:tw-p-0">
                    {title && (
                        <h3 className="tw-mb-[9px] tw-text-lg tw-font-bold tw-leading-relaxed tw-text-secondary">
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
