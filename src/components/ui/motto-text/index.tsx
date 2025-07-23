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
                "tw:font-medium tw:leading-relaxed tw:text-secondary-light",
                size === "md" && "tw:text-base",
                size === "lg" && "tw:text-lg",
                className
            )}
            ref={ref}
        >
            {text}{" "}
            <Anchor
                path={path}
                className={clsx(
                    "tw:relative tw:py-[3px] tw:font-bold tw:leading-none tw:text-primary",
                    "tw:before:absolute tw:before:bottom-0 tw:before:left-0 tw:before:h-px tw:before:w-full tw:before:origin-right tw:before:scale-x-100 tw:before:bg-gray-350 tw:before:transition-transform tw:before:delay-300 tw:before:duration-600 tw:before:ease-in-expo tw:before:content-['']",
                    "tw:after:absolute tw:after:bottom-0 tw:after:left-0 tw:after:h-px tw:after:w-full tw:after:origin-left tw:after:scale-x-0 tw:after:bg-primary tw:after:transition-transform tw:after:delay-75 tw:after:duration-600 tw:after:ease-in-expo tw:after:content-['']",
                    "tw:hover:before:scale-x-0 tw:hover:before:delay-75 tw:hover:after:scale-x-100 tw:hover:after:delay-300"
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
