import Anchor from "@ui/anchor";
import clsx from "clsx";
import { forwardRef } from "react";

type TProps = {
    text?: string;
    path: string;
    pathText: string;
    className?: string;
    size?: "md" | "lg";
};

const MottoText = forwardRef<HTMLParagraphElement, TProps>(
    ({ text, pathText, path, className, size }, ref) => (
        <p
            className={clsx(
                "tw-font-medium tw-leading-relaxed tw-text-secondary-light",
                size === "md" && "tw-text-base",
                size === "lg" && "tw-text-lg",
                className
            )}
            ref={ref}
        >
            {text}{" "}
            <Anchor
                path={path}
                className={clsx(
                    "tw-relative tw-py-[3px] tw-font-bold tw-leading-none tw-text-primary",
                    "before:tw-absolute before:tw-bottom-0 before:tw-left-0 before:tw-h-px before:tw-w-full before:tw-origin-right before:tw-scale-x-100 before:tw-bg-gray-100 before:tw-transition-transform before:tw-delay-300 before:tw-duration-600 before:tw-ease-in-expo before:tw-content-['']",
                    "after:tw-absolute after:tw-bottom-0 after:tw-left-0 after:tw-h-px after:tw-w-full after:tw-origin-left after:tw-scale-x-0 after:tw-bg-primary after:tw-transition-transform after:tw-delay-75 after:tw-duration-600 after:tw-ease-in-expo after:tw-content-['']",
                    "hover:before:tw-scale-x-0 hover:before:tw-delay-75 hover:after:tw-scale-x-100 hover:after:tw-delay-300"
                )}
            >
                {pathText} <i className="far fa-long-arrow-right" />
            </Anchor>
        </p>
    )
);

MottoText.defaultProps = {
    size: "lg",
};

export default MottoText;
