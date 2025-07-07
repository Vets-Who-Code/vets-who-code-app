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
                "tw:relative tw:inline-block tw:px-3.8 tw:py-2.5 tw:text-base tw:text-gray-400",
                "before:left-[calc(50%_-_7px) tw:before:ease-[cubic-bezier(.71,1.7,.77,1.24)] tw:before:pointer-events-none tw:before:invisible tw:before:absolute tw:before:bottom-full tw:before:z-20 tw:before:mb-[-13px] tw:before:border-[7px] tw:before:border-transparent tw:before:border-t-primary tw:before:opacity-0 tw:before:transition-all tw:before:duration-300 tw:before:content-['']",
                "tw:after:ease-[cubic-bezier(.71,1.7,.77,1.24)] tw:after:pointer-events-none tw:after:invisible tw:after:absolute tw:after:bottom-full tw:after:left-1/2 tw:after:z-10 tw:after:-translate-x-1/2 tw:after:whitespace-nowrap tw:after:rounded tw:after:bg-primary tw:after:px-2.5 tw:after:py-2 tw:after:leading-none tw:after:text-white tw:after:opacity-0 tw:after:shadow-xs tw:after:shadow-black/30 tw:after:transition-all tw:after:duration-300 tw:after:content-[attr(aria-label)]",
                "tw:hover:before:visible tw:hover:before:-translate-y-2 tw:hover:before:opacity-100 tw:hover:before:delay-100 tw:hover:after:visible tw:hover:after:-translate-y-2 tw:hover:after:opacity-100 tw:hover:after:delay-100"
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
