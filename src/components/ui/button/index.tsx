/**
 * @module ui/button
 * Reusable Button component supporting contained/outlined/ghost/texted variants,
 * semantic colors (primary, light, secondary, danger), forwardRef, and native attribute pass-through.
 * Renders as `<button>` by default or as `<Anchor>` when `path` is set.
 */
/* eslint-disable react/button-has-type */
import React from "react";
import clsx from "clsx";
import Anchor from "../anchor";

/**
 * Props for the Button component.
 *
 * Variant/color matrix:
 *   contained: primary (red fill) | light (white fill) | secondary (navy fill) | danger (red fill, destructive intent)
 *   outlined:  primary (red border) | light (white border) | secondary (navy border) | danger (red border)
 *   ghost:     primary (red text, hover tint) | light (white text) | secondary (navy text) | danger (red text)
 *   texted:    unstyled text, no border or background
 *
 * When `path` is set the component renders as an <a> via Anchor; ref is not forwarded in that case.
 */
interface ButtonProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "id" | "onClick"> {
    children: React.ReactNode;
    variant?: "contained" | "outlined" | "texted" | "ghost";
    color?: "primary" | "light" | "secondary" | "danger";
    size?: "xs" | "sm" | "md" | "lg";
    shape?: "tw-rounded" | "square" | "ellipse";
    fullwidth?: boolean;
    active?: boolean;
    iconButton?: boolean;
    path?: string;
    label?: string;
    hover?: "default" | "light" | false;
    /** Accepts number IDs from data types (e.g. ButtonType); coerced to string for the DOM */
    id?: string | number;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            id,
            type = "button",
            variant = "contained",
            color = "primary",
            size = "md",
            shape = "square",
            fullwidth = false,
            active = false,
            disabled = false,
            iconButton = false,
            label,
            className,
            path,
            onClick,
            hover = "default",
            ...rest
        },
        ref
    ) => {
    /* Base — sharp edges, GothamPro font, uppercase */
    const baseLayoutClass =
        "tw-font-bold tw-justify-center tw-items-center tw-transition-all tw-duration-300 tw-ease-out tw-min-w-max";
    const baseBorderClass = "tw-border tw-border-solid";
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
        !disabled && !active && hover === "default" && "hover:tw-border-red hover:tw-text-white";
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

    // Secondary Button
    const containedSecondaryClass = "tw-bg-secondary tw-border-secondary tw-text-white";
    const containedSecondaryHoverClass =
        !disabled &&
        !active &&
        hover === "default" &&
        "hover:tw-bg-navy-deep hover:tw-border-navy-deep hover:-tw-translate-y-px active:tw-scale-95";
    const containedSecondaryBtn = color === "secondary" && [
        containedSecondaryClass,
        containedSecondaryHoverClass,
        lightHoverClass,
    ];

    const outlinedSecondaryClass =
        "tw-bg-transparent tw-border-secondary tw-text-secondary tw-border-2";
    const outlinedSecondaryHoverClass =
        !disabled &&
        !active &&
        hover === "default" &&
        "hover:tw-bg-secondary hover:tw-text-white hover:-tw-translate-y-px active:tw-scale-95";
    const outlinedSecondaryBtn = color === "secondary" && [
        outlinedSecondaryClass,
        outlinedSecondaryHoverClass,
        lightHoverClass,
    ];

    // Danger Button — semantic alias for primary (same visual, destructive intent)
    const containedDangerBtn = color === "danger" && [
        containedPrimaryClass,
        containedPrimaryHoverClass,
        containedPrimaryActiveClass,
        lightHoverClass,
    ];
    const outlinedDangerBtn = color === "danger" && [
        outlinedPrimaryClass,
        outlinedPrimaryHoverClass,
        outlinedPrimaryActiveClass,
        lightHoverClass,
    ];

    // Ghost Button — no background, no border, hover tint per color
    const ghostBtn = variant === "ghost" && [
        color === "primary" && "tw-text-primary hover:tw-bg-primary/10",
        color === "light" && "tw-text-white hover:tw-bg-white/10",
        color === "secondary" && "tw-text-secondary hover:tw-bg-secondary/10",
        color === "danger" && "tw-text-primary hover:tw-bg-primary/10",
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

    /* Font upgrade — GothamPro for buttons */
    const fontUpgrade = variant !== "texted" ? "[font-family:var(--font-headline)]" : "";

    const classnames = clsx(
        variant !== "texted" && baseLayoutClass,
        variant !== "texted" && variant !== "ghost" && baseBorderClass,
        variant !== "texted" && variant !== "ghost" && baseNotFullWidthClass,
        variant === "ghost" && !fullwidth && "tw-inline-flex",
        variant === "contained" && [containedPrimaryBtn, containedLightBtn, containedSecondaryBtn, containedDangerBtn],
        variant === "outlined" && [outlinedPrimaryBtn, outlinedLightBtn, outlinedSecondaryBtn, outlinedDangerBtn],
        variant === "ghost" && ghostBtn,
        !iconButton && variant !== "texted" && [mdBtn, smBtn, xsBtn],
        sharpEdges,
        roundedBtn,
        ellipseBtn,
        fullBtn,
        fontUpgrade,
        "tw-uppercase tw-tracking-wider tw-text-xs",
        disabled && "tw-opacity-50 tw-cursor-not-allowed",
        className
    );

    const domId = id !== undefined ? String(id) : undefined;

    if (path) {
        return (
            <Anchor
                path={path}
                id={domId}
                className={classnames}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onClick={onClick as any}
                aria-label={label}
                {...(rest as React.HTMLAttributes<HTMLAnchorElement>)}
            >
                {children}
            </Anchor>
        );
    }

    return (
        <button ref={ref} id={domId} type={type} disabled={disabled} className={classnames} onClick={onClick} aria-label={label} {...rest}>
            {children}
        </button>
    );
    }
);

Button.displayName = "Button";

export default Button;
