/* eslint-disable jsx-a11y/no-static-element-interactions */

import Link from "next/link";
import { ReactNode } from "react";

const defaultProps = {
    target: "_blank",
    rel: "noopener noreferrer",
};

type TProps = typeof defaultProps &
    React.HTMLAttributes<HTMLAnchorElement> & {
        path: string;
        children: ReactNode;
        className?: string;
        onClick?: () => void;
        onKeyPress?: (e: React.KeyboardEvent<HTMLAnchorElement>) => void;
        onFocus?: (e: React.FocusEvent<HTMLAnchorElement>) => void;
        onBlur?: (e: React.FocusEvent<HTMLAnchorElement>) => void;
    };

const Anchor = ({
    path,
    children,
    className,
    rel,
    target,
    onClick,
    onKeyPress,
    onFocus,
    onBlur,
    ...rest
}: TProps) => {
    if (!path) return null;

    const internal = /^\/(?!\/)/.test(path);

    const commonProps = {
        className,
        onClick,
        onKeyPress,
        onFocus,
        onBlur,
        ...rest,
    };

    if (!internal || path.startsWith("#")) {
        return (
            <Link href={path} rel={rel} target={target} {...commonProps}>
                {children}
            </Link>
        );
    }

    return (
        <Link href={path} {...commonProps}>
            {children}
        </Link>
    );
};

Anchor.defaultProps = defaultProps;

Anchor.displayName = "Anchor";

export default Anchor;
