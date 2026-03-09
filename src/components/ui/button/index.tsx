/* eslint-disable react/button-has-type */
import clsx from "clsx";
import Anchor from "../anchor";

interface ButtonProps {
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    variant?: "contained" | "outlined" | "texted";
    color?: "primary" | "light";
    size?: "xs" | "sm" | "md" | "lg";
    shape?: "tw-rounded" | "square" | "ellipse";
    fullwidth?: boolean;
    active?: boolean;
    disabled?: boolean;
    iconButton?: boolean;
    onClick?: () => void;
    className?: string;
    path?: string;
    label?: string;
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
    /* Base — sharp edges, HashFlag font, uppercase */
    const baseClass =
        "tw-font-bold tw-justify-center tw-items-center tw-border tw-border-solid tw-transition-all tw-duration-300 tw-ease-out tw-min-w-max";
    const baseNotFullWidthClass = !fullwidth && "tw-inline-flex";

    /* No border-radius — sharp edges signal precision */
    const sharpEdges = "tw-rounded-none";

    const lightHoverClass =
        !disabled &&
        !active &&
        hover === "light" &&
        "hover:tw-bg-white hover:tw-border-white hover:tw-text-primary hover:tw-shadow-lg hover:tw-shadow-white/25 hover:-tw-translate-y-px active:tw-scale-95";

    // Primary Button — Red CTA, Obama campaign energy
    const containedPrimaryClass =
        "tw-bg-primary tw-border-primary tw-text-white tw-shadow-md tw-shadow-primary/20";
    const containedPrimaryHoverClass =
        !disabled &&
        !active &&
        hover === "default" &&
        "hover:tw-bg-red-crimson hover:tw-border-red-crimson hover:tw-text-white hover:tw-shadow-lg hover:tw-shadow-primary/30 hover:-tw-translate-y-px active:tw-scale-95";
    const containedPrimaryActiveClass =
        !disabled &&
        active &&
        "tw-bg-secondary tw-border-secondary active:tw-bg-secondary active:tw-border-secondary tw-shadow-xl tw-shadow-primary/40";
    const containedPrimaryBtn = color === "primary" && [
        containedPrimaryClass,
        containedPrimaryHoverClass,
        containedPrimaryActiveClass,
        lightHoverClass,
    ];

    const outlinedPrimaryClass = "tw-bg-transparent tw-border-primary tw-text-primary tw-border-2";
    const outlinedPrimaryHoverClass =
        !disabled &&
        !active &&
        hover === "default" &&
        "hover:tw-bg-primary hover:tw-text-white hover:tw-shadow-lg hover:tw-shadow-primary/20 hover:-tw-translate-y-px active:tw-scale-95";
    const outlinedPrimaryActiveClass =
        !disabled &&
        active &&
        hover === "default" &&
        "tw-bg-primary tw-border-primary tw-text-white active:tw-bg-primary active:tw-bg-primary tw-shadow-lg tw-shadow-primary/30";
    const outlinedPrimaryBtn = color === "primary" && [
        outlinedPrimaryClass,
        outlinedPrimaryHoverClass,
        outlinedPrimaryActiveClass,
        lightHoverClass,
    ];

    // Light Button
    const containedLightClass = "tw-bg-white tw-border-white tw-text-navy tw-shadow-sm";
    const containedLightHoverClass =
        !disabled &&
        !active &&
        hover === "default" &&
        "hover:tw-bg-primary hover:tw-border-primary hover:tw-text-white hover:tw-shadow-lg hover:tw-shadow-primary/20 hover:-tw-translate-y-px active:tw-scale-95";
    const containedLightActiveClass =
        !disabled &&
        active &&
        "tw-bg-primary tw-border-primary active:tw-bg-primary active:tw-border-primary tw-shadow-lg tw-shadow-primary/30";
    const containedLightBtn = color === "light" && [
        containedLightClass,
        containedLightHoverClass,
        containedLightActiveClass,
        lightHoverClass,
    ];

    const outlinedLightClass = "tw-border-white/15 tw-text-white";
    const outlinedLightHoverClass =
        !disabled &&
        !active &&
        hover === "default" &&
        "hover:tw-border-red hover:tw-text-white";
    const outlinedLightActiveClass =
        !disabled &&
        active &&
        "tw-bg-accent tw-border-accent active:tw-bg-accent active:tw-border-accent tw-text-secondary";
    const outlinedLightBtn = color === "light" && [
        outlinedLightClass,
        outlinedLightHoverClass,
        outlinedLightActiveClass,
        lightHoverClass,
    ];

    // Button Sizes
    const mdBtn =
        size === "md" &&
        "tw-text-md tw-px-7 tw-py-1 tw-min-h-[48px] md:tw-min-h-[52px] md:tw-px-10";
    const smBtn = size === "sm" && "tw-text-sm tw-px-6 tw-py-1 tw-min-h-[40px] md:tw-min-h-[44px]";
    const xsBtn = size === "xs" && "tw-text-[13px] tw-px-5 tw-leading-[30px] tw-min-h-8";

    // Button Shapes — default to sharp edges
    const roundedBtn = shape === "tw-rounded" && sharpEdges;
    const ellipseBtn = shape === "ellipse" && sharpEdges;
    const fullBtn = fullwidth && "tw-flex tw-w-full";

    /* Font upgrade — HashFlag for buttons */
    const fontUpgrade = variant !== "texted" ? "[font-family:var(--font-headline,HashFlag,sans-serif)]" : "";

    const classnames = clsx(
        variant !== "texted" && baseClass,
        variant !== "texted" && baseNotFullWidthClass,
        variant === "contained" && [containedPrimaryBtn, containedLightBtn],
        variant === "outlined" && [outlinedPrimaryBtn, outlinedLightBtn],
        !iconButton && variant !== "texted" && [mdBtn, smBtn, xsBtn],
        sharpEdges,
        roundedBtn,
        ellipseBtn,
        fullBtn,
        fontUpgrade,
        "tw-uppercase tw-tracking-wider tw-text-xs",
        className
    );

    if (path) {
        return (
            <Anchor path={path} className={classnames} onClick={onClick} aria-label={label}>
                {children}
            </Anchor>
        );
    }

    return (
        <button type={type} className={classnames} onClick={onClick} aria-label={label}>
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
