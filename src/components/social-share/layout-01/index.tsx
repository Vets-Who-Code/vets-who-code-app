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
        <div className="tw:group tw:relative tw:inline-flex tw:cursor-pointer tw:items-center tw:text-body tw:transition-colors tw:hover:text-primary">
            <h6 className="tw:mb-0 tw:mr-3.8 tw:text-md tw:text-current">Share this course</h6>
            <i className="far fa-share-alt" />

            <div
                className={clsx(
                    "tw:absolute tw:bottom-full tw:left-1/2 tw:w-auto tw:-translate-x-1/2 tw:-translate-y-2.5 tw:whitespace-nowrap tw:rounded-sm tw:bg-white tw:px-1 tw:shadow-3sm tw:shadow-black/6",
                    "tw:ease-[cubic-bezier(.71,1.7,.77,1.24)] tw:invisible tw:z-10 tw:select-none tw:opacity-0 tw:drop-shadow-[0_2px_20px_rgba(0,0,0,0.06)] tw:transition-all tw:duration-300",
                    "tw:before:invisible tw:before:absolute tw:before:left-1/2 tw:before:top-full tw:before:-translate-x-1/2 tw:before:border-x-[9px] tw:before:border-t-8 tw:before:border-x-transparent tw:before:border-t-white tw:before:opacity-0 tw:before:content-['']",
                    "tw:after:absolute tw:after:-bottom-6 tw:after:left-0 tw:after:h-7 tw:after:w-full tw:after:content-['']",
                    "tw:group-hover:visible tw:group-hover:-translate-x-1/2 tw:group-hover:-translate-y-5 tw:group-hover:opacity-100 tw:group-hover:before:visible tw:group-hover:before:opacity-100"
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
