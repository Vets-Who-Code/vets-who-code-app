/* eslint-disable jsx-a11y/no-static-element-interactions */
import { ReactNode } from "react";
import Link from "next/link";

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
    if (!internal) {
        const isHash = path.startsWith("#");
        if (isHash) {
            return (
                <a
                    rel={rel}
                    className={className}
                    href={path}
                    onClick={onClick}
                    onKeyPress={onKeyPress}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    {...rest}
                >
                    {children}
                </a>
            );
        }
        return (
            <a
                rel={rel}
                className={className}
                href={path}
                target={target}
                onClick={onClick}
                onKeyPress={onKeyPress}
                onFocus={onFocus}
                onBlur={onBlur}
                {...rest}
            >
                {children}
            </a>
        );
    }

    return (
        <Link href={path} passHref>
            <a
                className={className}
                onClick={onClick}
                onKeyPress={onKeyPress}
                onFocus={onFocus}
                onBlur={onBlur}
                {...rest}
            >
                {children}
            </a>
        </Link>
    );
};

Anchor.defaultProps = defaultProps;

Anchor.displayName = "Anchor";

export default Anchor;
