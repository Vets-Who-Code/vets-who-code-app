import { forwardRef } from "react";
import Anchor from "@ui/anchor";
import clsx from "clsx";

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
                "tw-font-medium tw-text-secondary-light tw-leading-relaxed",
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
                    "tw-font-bold tw-leading-none tw-relative tw-py-[3px] tw-text-primary",
                    "before:tw-absolute before:tw-content-[''] before:tw-w-full before:tw-scale-x-100 before:tw-origin-right before:tw-bg-gray-350 before:tw-transition-transform before:tw-duration-600 before:tw-delay-300 before:tw-ease-in-expo before:tw-bottom-0 before:tw-left-0 before:tw-h-px",
                    "after:tw-absolute after:tw-content-[''] after:tw-w-full after:tw-scale-x-0 after:tw-origin-left after:tw-bg-primary after:tw-transition-transform after:tw-duration-600 after:tw-delay-75 after:tw-ease-in-expo after:tw-bottom-0 after:tw-left-0 after:tw-h-px",
                    "hover:before:tw-scale-x-0 hover:after:tw-scale-x-100 hover:after:tw-delay-300 hover:before:tw-delay-75"
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
