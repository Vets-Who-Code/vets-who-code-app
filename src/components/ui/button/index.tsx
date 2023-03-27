/* eslint-disable react/button-has-type */
import clsx from "clsx";
import Anchor from "../anchor";

interface ButtonProps {
    /**
     * Required.
     */
    children: React.ReactNode;
    /**
     * Optional. Default is `button`.
     */
    type?: "button" | "submit" | "reset";
    /**
     * Optional. Default is `contained`.
     */
    variant?: "contained" | "outlined" | "texted";
    /**
     * Optional. Default is `primary`.
     */
    color?: "primary" | "light";
    /**
     * Optional. Default is `md`.
     */
    size?: "xs" | "sm" | "md" | "lg";
    /**
     * Optional. Default is `tw-rounded`.
     */
    shape?: "tw-rounded" | "square" | "ellipse";
    /**
     * Pass fullwidth to make button fullwidth.
     */
    fullwidth?: boolean;
    /**
     * Pass active to enable active state.
     */
    active?: boolean;
    /**
     * Pass disabled to enable disabled state.
     */
    disabled?: boolean;
    /**
     * Pass iconButton to get Icon Button style.
     */
    iconButton?: boolean;
    /**
     * Optional. onClick function
     */
    onClick?: () => void;
    /**
     * Optional. Extra Class Name
     */
    className?: string;
    /**
     * Pass `path` to make link button
     */
    path?: string;
    /**
     * Optional. Pass label if button does not contain any text
     */
    label?: string;
    /**
     * Optional. Pass false if you don't need hover and focus
     */
    hover?: "default" | "light" | false;
}

const Button = ({
    children,
    type,
    variant,
    color,
    size,
    shape,
    fullwidth,
    active,
    disabled,
    iconButton,
    label,
    className,
    path,
    onClick,
    hover,
}: ButtonProps) => {
    const baseClass =
        "tw-font-bold tw-justify-center tw-items-center tw-border tw-border-solid tw-rounded-md tw-transition-colors tw-min-w-max";
    const baseNotFullWidthClass = !fullwidth && "tw-inline-flex";
    const lightHoverClass =
        !disabled &&
        !active &&
        hover === "light" &&
        "hover:tw-bg-white hover:tw-border-white hover:tw-text-primary";

    // Primary Button
    const containedPrimaryClass =
        "tw-bg-primary tw-border-primary tw-text-white";
    const containedPrimaryHoverClass =
        !disabled &&
        !active &&
        hover === "default" &&
        "hover:tw-bg-secondary hover:tw-border-secondary hover:tw-text-white";
    const containedPrimaryActiveClass =
        !disabled &&
        active &&
        "tw-bg-secondary tw-border-secondary active:tw-bg-secondary active:tw-border-secondary";
    const containedPrimaryBtn = color === "primary" && [
        containedPrimaryClass,
        containedPrimaryHoverClass,
        containedPrimaryActiveClass,
        lightHoverClass,
    ];

    const outlinedPrimaryClass =
        "tw-bg-transparent tw-border-primary tw-text-primary";
    const outlinedPrimaryHoverClass =
        !disabled &&
        !active &&
        hover === "default" &&
        "hover:tw-bg-primary hover:tw-text-white";
    const outlinedPrimaryActiveClass =
        !disabled &&
        active &&
        hover === "default" &&
        "tw-bg-primary tw-border-primary tw-text-white active:tw-bg-primary active:tw-bg-primary";
    const outlinedPrimaryBtn = color === "primary" && [
        outlinedPrimaryClass,
        outlinedPrimaryHoverClass,
        outlinedPrimaryActiveClass,
        lightHoverClass,
    ];

    // Light Button
    const containedLightClass = "tw-bg-light tw-border-light tw-text-heading";
    const containedLightHoverClass =
        !disabled &&
        !active &&
        hover === "default" &&
        "hover:tw-bg-primary hover:tw-border-primary hover:tw-text-white";
    const containedLightActiveClass =
        !disabled &&
        active &&
        "tw-bg-primary tw-border-primary active:tw-bg-primary active:tw-border-primary";
    const containedLightBtn = color === "light" && [
        containedLightClass,
        containedLightHoverClass,
        containedLightActiveClass,
        lightHoverClass,
    ];

    const outlinedLightClass = "tw-border-light tw-text-light";
    const outlinedLightHoverClass =
        !disabled &&
        !active &&
        hover === "default" &&
        "hover:tw-bg-primary hover:tw-border-primary hover:tw-text-white";
    const outlinedLightActiveClass =
        !disabled &&
        active &&
        "tw-bg-primary tw-border-primary active:tw-bg-primary active:tw-border-primary";
    const outlinedLightBtn = color === "light" && [
        outlinedLightClass,
        outlinedLightHoverClass,
        outlinedLightActiveClass,
        lightHoverClass,
    ];

    // Buton Sizes
    const mdBtn =
        size === "md" &&
        "tw-text-md tw-px-7 tw-py-1 tw-min-h-[48px] md:tw-min-h-[52px] md:tw-px-10";
    const xsBtn =
        size === "xs" && "tw-text-[13px] tw-px-5 tw-leading-[30px] tw-min-h-8";

    // Button Shapes
    const roundedBtn = shape === "tw-rounded" && "tw-rounded-md";
    const ellipseBtn = shape === "ellipse" && "tw-rounded-full";
    const fullBtn = fullwidth && "tw-flex tw-w-full";

    const classnames = clsx(
        variant !== "texted" && baseClass,
        variant !== "texted" && baseNotFullWidthClass,
        variant === "contained" && [containedPrimaryBtn, containedLightBtn],
        variant === "outlined" && [outlinedPrimaryBtn, outlinedLightBtn],
        !iconButton && variant !== "texted" && [mdBtn, xsBtn],
        roundedBtn,
        ellipseBtn,
        fullBtn,
        className
    );

    if (path) {
        return (
            <Anchor
                path={path}
                className={classnames}
                onClick={onClick}
                aria-label={label}
            >
                {children}
            </Anchor>
        );
    }

    return (
        <button
            type={type}
            className={classnames}
            onClick={onClick}
            aria-label={label}
        >
            {children}
        </button>
    );
};

Button.defaultProps = {
    type: "button",
    variant: "contained",
    color: "primary",
    size: "md",
    shape: "square",
    fullwidth: false,
    active: false,
    disabled: false,
    iconButton: false,
    hover: "default",
};

Button.displayName = "Button";

export default Button;
