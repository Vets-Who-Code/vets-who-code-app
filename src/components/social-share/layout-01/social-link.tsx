import { MouseEvent } from "react";
import clsx from "clsx";

type TProps = {
    children: React.ReactNode;
    href: string;
    label: string;
    onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
};

const SocialLink = ({ children, href, label, onClick }: TProps) => {
    return (
        <a
            className={clsx(
                "tw-relative tw-inline-block tw-px-3.8 tw-py-2.5 tw-text-base tw-text-gray-400",
                "before:left-[calc(50%_-_7px) before:tw-ease-[cubic-bezier(.71,1.7,.77,1.24)] before:tw-pointer-events-none before:tw-invisible before:tw-absolute before:tw-bottom-full before:tw-z-20 before:tw-mb-[-13px] before:tw-border-[7px] before:tw-border-transparent before:tw-border-t-primary before:tw-opacity-0 before:tw-transition-all before:tw-duration-300 before:tw-content-['']",
                "after:tw-ease-[cubic-bezier(.71,1.7,.77,1.24)] after:tw-pointer-events-none after:tw-invisible after:tw-absolute after:tw-bottom-full after:tw-left-1/2 after:tw-z-10 after:-tw-translate-x-1/2 after:tw-whitespace-nowrap after:tw-rounded after:tw-bg-primary after:tw-px-2.5 after:tw-py-2 after:tw-leading-none after:tw-text-white after:tw-opacity-0 after:tw-shadow-xs after:tw-shadow-black/30 after:tw-transition-all after:tw-duration-300 after:tw-content-[attr(aria-label)]",
                "hover:before:tw-visible hover:before:-tw-translate-y-2 hover:before:tw-opacity-100 hover:before:tw-delay-100 hover:after:tw-visible hover:after:-tw-translate-y-2 hover:after:tw-opacity-100 hover:after:tw-delay-100"
            )}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            onClick={onClick}
        >
            {children}
        </a>
    );
};

SocialLink.displayName = "SocialLink";

export default SocialLink;
