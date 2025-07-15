import Anchor from "@ui/anchor";
import clsx from "clsx";

type TProps = {
    children: React.ReactNode;
    id?: string;
    path: string;
    hoverStyle?: "A" | "B";
    color?: "light" | "dark";
    onKeyPress?: (e: React.KeyboardEvent<HTMLAnchorElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLAnchorElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLAnchorElement>) => void;
};

const NavLink = ({
    children,
    id,
    path,
    hoverStyle,
    color,
    onKeyPress,
    onFocus,
    onBlur,
    ...rest
}: TProps) => {
    return (
        <Anchor
            path={path}
            id={id}
            className={clsx(
                "tw:flex tw:items-center tw:font-medium tw:leading-snug tw:2xl:text-[16px]",
                color === "light" && "tw:text-white tw:hover:text-white",
                color === "dark" && "tw:text-secondary tw:hover:text-primary",
                hoverStyle === "B" &&
                    "tw:relative tw:before:absolute tw:before:bottom-0 tw:before:left-0 tw:before:h-px tw:before:w-0 tw:before:transition-all tw:before:duration-300 tw:before:content-[''] tw:hover:before:w-full",
                hoverStyle === "B" && color === "dark" && "tw:before:bg-primary",
                hoverStyle === "B" && color === "light" && "tw:before:bg-white"
            )}
            onKeyPress={onKeyPress}
            onFocus={onFocus}
            onBlur={onBlur}
            role="menuitem"
            tabIndex={0}
            {...rest}
        >
            {children}
        </Anchor>
    );
};

export default NavLink;
