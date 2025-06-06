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
                "tw-flex tw-items-center tw-font-medium tw-leading-snug 2xl:tw-text-[16px]",
                color === "light" && "tw-text-white hover:tw-text-white",
                color === "dark" && "tw-text-secondary",
                hoverStyle === "B" &&
                    "tw-relative before:tw-absolute before:tw-bottom-0 before:tw-left-0 before:tw-h-px before:tw-w-0 before:tw-transition-all before:tw-duration-300 before:tw-content-[''] hover:before:tw-w-full",
                hoverStyle === "B" && color === "dark" && "before:tw-bg-primary",
                hoverStyle === "B" && color === "light" && "before:tw-bg-white"
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
