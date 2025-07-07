import { Children, FunctionComponent, ReactChild, ReactText } from "react";
import cn from "clsx";
import SocialLink from "./social-link";

type TProps = {
    children: React.ReactNode;
    className?: string;
    flyout?: boolean;
    color?: "light" | "white" | "dark";
    variant?: "contained" | "outlined" | "texted";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    shape?: "square" | "rounded" | "circle";
    hover?: boolean;
    tooltip?: boolean;
};

type IChild = Exclude<ReactChild, ReactText>;

const Social = ({
    children,
    className,
    color,
    variant,
    size,
    shape,
    hover,
    tooltip,
    flyout,
}: TProps) => {
    const RenderChild = Children.map(children, (el) => {
        const child = el as IChild;
        if (child !== null) {
            const childType = child.type as FunctionComponent;
            const name = childType.displayName || childType.name;
            if (name === "SocialLink") {
                return (
                    <child.type
                        {...child.props}
                        color={color}
                        variant={variant}
                        size={size}
                        shape={shape}
                        hover={hover}
                        tooltip={tooltip}
                    />
                );
            }
        }
        return null;
    });
    const flyoutClass =
        "tw:absolute tw:bottom-full tw:right-0 tw:-translate-y-2.5 tw:w-auto tw:whitespace-nowrap tw:px-1 tw:bg-white tw:rounded-sm tw:shadow-3sm tw:shadow-black/6 tw:drop-shadow-[0_2px_20px_rgba(0,0,0,0.06)] tw:z-10 tw:select-none tw:transition-all tw:duration-300 tw:ease-[cubic-bezier(.71,1.7,.77,1.24)] tw:invisible tw:opacity-0";
    const flyoutBeforeClass =
        "tw:before:absolute tw:before:content-[''] tw:before:top-full tw:before:right-5 tw:before:border-t-8 tw:before:border-t-white tw:before:border-x-[9px] tw:before:border-x-transparent tw:before:invisible tw:before:opacity-0";
    const flyoutAfterClass =
        "tw:after:absolute tw:after:content-[''] tw:after:left-0 tw:after:-bottom-6 tw:after:w-full tw:after:h-7";
    const flyoutHoverClass =
        "tw:group-hover:visible tw:group-hover:opacity-100 tw:group-hover:-translate-y-5 tw:group-hover:before:visible tw:group-hover:before:opacity-100";
    return (
        <div
            className={cn(
                "social tw:flex",
                flyout && [flyoutClass, flyoutBeforeClass, flyoutAfterClass, flyoutHoverClass],
                className
            )}
        >
            {RenderChild}
        </div>
    );
};

Social.defaultProps = {
    size: "md",
    shape: "square",
    variant: "texted",
    hover: true,
};

export { SocialLink };
export default Social;
