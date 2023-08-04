import { useEffect, useState, MouseEvent } from "react";
import clsx from "clsx";
import SocialLink from "./social-link";

const SocialShare = () => {
    const [href, setHref] = useState("");
    useEffect(() => {
        setHref(window.location.href);
    }, []);

    const clickHandler = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const url = e.currentTarget.href;
        window.open(
            url,
            "Twitter",
            "toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,width=800,height=600,resizable=1"
        );
    };

    return (
        <div className="tw-inline-flex tw-items-center tw-relative tw-cursor-pointer tw-transition-colors tw-text-body tw-group hover:tw-text-primary">
            <h6 className="tw-text-md tw-mb-0 tw-mr-3.8 tw-text-current">
                Share this course
            </h6>
            <i className="far fa-share-alt" />

            <div
                className={clsx(
                    "tw-absolute tw-bottom-full tw-left-1/2 -tw-translate-x-1/2 -tw-translate-y-2.5 tw-w-auto tw-whitespace-nowrap tw-px-1 tw-bg-white tw-rounded tw-shadow-3sm tw-shadow-black/[.06]",
                    "tw-drop-shadow-[0_2px_20px_rgba(0,0,0,0.06)] tw-z-10 tw-select-none tw-transition-all tw-duration-300 tw-ease-[cubic-bezier(.71,1.7,.77,1.24)] tw-invisible tw-opacity-0",
                    "before:tw-absolute before:tw-content-[''] before:tw-top-full before:tw-left-1/2 before:-tw-translate-x-1/2 before:tw-border-t-8 before:tw-border-t-white before:tw-border-x-[9px] before:tw-border-x-transparent before:tw-invisible before:tw-opacity-0",
                    "after:tw-absolute after:tw-content-[''] after:tw-left-0 after:-tw-bottom-6 after:tw-w-full after:tw-h-7",
                    "group-hover:tw-visible group-hover:tw-opacity-100 group-hover:-tw-translate-x-1/2 group-hover:-tw-translate-y-5 group-hover:before:tw-visible group-hover:before:tw-opacity-100"
                )}
            >
                <SocialLink
                    label="Facebook"
                    href={`https://www.facebook.com/sharer/sharer.php?u=${href}`}
                    onClick={clickHandler}
                >
                    <i className="fab fa-facebook-f" />
                </SocialLink>
                <SocialLink
                    label="Twitter"
                    href={`https://twitter.com/intent/tweet?url=${href}`}
                    onClick={clickHandler}
                >
                    <i className="fab fa-twitter" />
                </SocialLink>
                <SocialLink
                    label="Linkedin"
                    href={`https://www.linkedin.com/shareArticle?url=${href}`}
                    onClick={clickHandler}
                >
                    <i className="fab fa-linkedin" />
                </SocialLink>
            </div>
        </div>
    );
};

export default SocialShare;
